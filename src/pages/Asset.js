import { useState, useEffect } from 'react'
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { useParams, Navigate, useNavigate, useLocation} from 'react-router-dom'
import './Asset.css';
import Button from '../components/Button'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Task } from '@mui/icons-material';
import {Link} from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import contractAddress from '../constants/contractAddress';
import unbolt from '../truffle/build/contracts/UnBolt.json'
// import tasks from '../truffle/build/contracts/Tasks.json'
// import assets from '../truffle/build/contracts/Assets.json'

const Asset = () => {
   // The useMoralis hook provides all the basics functionalities that is needed for authentication and user data.
    const { authenticate, isAuthenticated, logout, user, enableWeb3,isWeb3Enabled,Moralis } = useMoralis();

    // useState gives a local state in a function component
    // the first paramter is the value and the second is the setter
    const [loading, setLoading] = useState(true)
    const [asset, setAsset] = useState([])
    const [taskCount, setTaskCount] = useState([])
    const [task, setTask] = useState([])
    const [error, setError] = useState(null)

    const params = useParams()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    
    // allows for performing side effects in the component
    // side effect in this case being calling the loadPage() function
    // use effect runs after every render
    // if the value of the second argunment changes(isAuthenticated, isWeb3Enabled, asset,task,loading), useEffect is rerun
    useEffect(() => {
        const loadPage = async () => {
          //ge the connectorID using the console window 
          const connectorId = window.localStorage.getItem("connectorId");
          try {
            //check if authicated and web3 is not enabled in order
            if (isAuthenticated && !isWeb3Enabled){
              //enable web3 and store in a varible
              const web3Provider = await enableWeb3({ provider: connectorId });
            }
            //checking if the asset has already been loaded with the data, if (length==0) then no data has been loaded
            if(asset.length == 0){
              // call the function loadData() but wait 1 second before doing this in order to let enableweb3() run above
              await setTimeout(function() { loadData() }, 1000);
              await setLoading(false)
            }
          } catch (error) {
            console.log(error);
          }
        }
        // call the function loadPage on each render of the page
        loadPage()
      }, 
      //callback functions, array of variables that the component will check to make sure changed before re-rendering. 
      [isAuthenticated, isWeb3Enabled, asset,task,loading]);

    
   //convrt all the bigNumbers type in the asset to number
   async function convertAssetToNumber(_array){
    const data = _array
    const tempArray = { id: data.id.toNumber(), assetName: data.assetName,quantity: data.quantity.toNumber() ,completed: data.completed, creator: data.creator  }
  
    return tempArray
  }

  //getting an asset data based on the index of the mapping from the smart contract, returns a message object
  async function getAsset(){
  //defining the parameters for the execute function call, which executes a function in the smart contract
  const options = {
    abi: unbolt.abi,
    contractAddress: contractAddress.unboltContractAddress,
    functionName: 'assets',
    //empty parameter because this getter is generated automatically by solidity on creation of a mapping
    params: {
        '': params.id-1,
    }
    }
    //calls the smart contract function while returning the data in variable message
    const message = await Moralis.executeFunction(options)
    const _asset = await convertAssetToNumber(message)
    setAsset(_asset)

  }
  

  //convrt all the bigNumbers type in the asset to number
  async function convertTasksToNumber(array){
    const tempArray = []

    try {
      for (let index = 0; index <= array.length-1; index++) {
        const data = array[index]
        if(data.id != undefined){
          tempArray[index] = { 
            id: data.id.toNumber(), 
            content: data.content,
            creator_note: data.creator_note,
            intermediary_note: data.intermediary_note,
            completed: data.completed, 
            signator: data.signator, 
            asset: data.asset  }
        }
      }
    } catch (error) {
      console.log(error);
    }
    // console.log(tempArray);

    return tempArray
  // obj.map((o) => { id: parseInt(o[0]['hex'])})

  }

  //getting all task based  returns a message object
  async function getAllTasks(){
    //defining the parameters for the execute function call, which executes a function in the smart contract
    const options = {
      abi: unbolt.abi,
      contractAddress: contractAddress.unboltContractAddress,
      functionName: 'getAssetTasks',
      params: {
        _assetID: params.id,
    }
    }
    //calls the smart contract function while returning the data in variable message
    const message = await Moralis.executeFunction(options)
    // console.log(message);
    const list = convertTasksToNumber(message)
    return list
  }
    

    
      

    //load data and store them in state in state hooks 
    //in order to access them and pass them as props to other pages/components
    async function loadData() {
      const taskFromBlockchain = await getAllTasks();
      await setTask(taskFromBlockchain)

      await setTimeout(function() { getAsset(); }, 1000);

    }

    //call smart contract function that changes the task status to the opposite value 
    async function toggleTaskComplete(id) {
      console.log('Task of id ', id,'is set to complete');
      console.log(unbolt.abi);
      const options = {
        abi: unbolt.abi,
        contractAddress: contractAddress.unboltContractAddress,
        functionName: 'toggleTaskCompleted',
        //takes id as parameter as the solidity function needs this
        params: {
          _id: id,
        }
        }
        //calls the smart contract function while returning the data in variable message
        const message = await Moralis.executeFunction(options)
        console.log('completed at:', message);
        alert("task has been set to complete")
    }

    // if there are asset to display, display them else set screen to loading...
    return asset.length == 0 ? (<h1 className='loading-message'> <CircularProgress color="inherit" /> </h1>) :(
        <div className='asset'>

            <div className='asset-task-container'>
                {/* div for displaying the current asset  */}
                <div className='section asset-display2'> 
                    AssetDisplay2 
                    <Button classVar='dark' text={'Tasks'} onClick={()=>{console.log(task);}}/> 
                    <Button classVar='dark' text={'asset'} onClick={()=>{console.log(asset)}}/> 

                </div>
                <div className='section task-display'> 
                    <div className='task-header'>
                        <p>Dashboard/ {asset.assetName} / Tasks</p>
                        <Link to= '/dashboard'> 
                         <ArrowBackIosNewIcon className='icon'/> Back to Dashboard
                        </Link>
                    </div>
                    <div className='task-content'>
                        <div className=''>
                        <h1>Task</h1>
                        <p>View tasks allocated to the production of this asset</p>
                        <p>This section is scrollable(if you have enough tasks)</p>
                        {/* <Button classVar='dark' text={'get tasks'} onClick={()=>{console.log(task)}}/> 
                        <Button classVar='dark' text={'get asset'} onClick={()=>{console.log(asset)}}/> 
                         */}

                        </div>

                        {/* filter task [] to make sure their assetId is related to current asset */}
                        {/* check if this array after filter is == 0, then show no tasks */}
                        <div className='task-list'>
                            {task.length == 0 ? 
                            <div className='no-task-message-container'>
                            <small className='no-task-message'>You dont have any tasks at the moment</small>
                            <Link to={`/createTask/${asset.id}`}> <Button classVar='dark' text={'Create Task'}/> </Link> 
                            </div>
                            :
                            <>
                          {/* filter task [] to make sure their assetId is related to current asset */}
                          {/* as task array is not ==0 show all taks by mapping through the array */}
                            {task.map((item)=>{return(
                            <div className='task' key={parseInt(item.id)}>
                              <p>Description: {item.content}</p> 
                              {/* <p>Asset id: {item.assetId}</p> */}
                              <p>signator: {item.signator}</p>
                              {/* {console.log(item.completed)} */}
                              {item.completed ? <>Completed</> : <>Not Complete</>}
                              {item.signator.toLowerCase() == user.get("ethAddress").toLowerCase() &&
                              <>
                                <Button classVar='dark' text={'Toggle Complete'} onClick={()=>{toggleTaskComplete(item.id)}}/> 
                            
                              </>
                              }
                            </div>
                            
                            )})}
                        
                             <Link to={`/createTask/${asset.id}`}> <Button classVar='dark' text={'Add Task'}/> </Link>
                            </>
                        }
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
            
    )
  
  }
  
  
  export default Asset


