import { useState, useEffect } from 'react'
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import assets from '../truffle/build/contracts/Assets.json'
import tasks from '../truffle/build/contracts/Tasks.json'
import { useParams, Navigate, useNavigate, useLocation} from 'react-router-dom'
import './Asset.css';
import Button from '../components/Button'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Task } from '@mui/icons-material';
import {Link} from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';

const Asset = () => {
    const { authenticate, isAuthenticated, logout, user, enableWeb3,isWeb3Enabled,Moralis } = useMoralis();
    const [loading, setLoading] = useState(true)
    const [asset, setAsset] = useState([])
    const [taskCount, setTaskCount] = useState([])
    const [task, setTask] = useState([])
    const [error, setError] = useState(null)

    const params = useParams()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    //this function is run on each render/loading of the page
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

    

  //gett task count from the smart contract by calling function taskCount() which returns the task count
  async function getTaskCount(){
    //defining the parameters for the execute function call, which executes a function in the smart contract
    const readOptions = {
      contractAddress: '0x79655a20e9d6BA7296188644d9411f37fFF1f4b8',
      functionName: "taskCount",
      abi: tasks.abi,
    };
    //calls the smart contract function while returning the data in variable message
    const message = await Moralis.executeFunction(readOptions);
    console.log(message.toNumber());
    setTaskCount(message.toNumber())
    }

    //getting an asset data based on the index of the mapping from the smart contract, returns a message object
    async function getAssetDataIndex(i){
        //defining the parameters for the execute function call, which executes a function in the smart contract
        const options = {
        abi: assets.abi,
        contractAddress: '0x71D6B1f99f3832FF199753Bb0469fd25456A6C43',
        functionName: 'assets',
        //empty parameter because this getter is generated automatically by solidity on creation of a mapping
        params: {
            '': i,
        }
        }
        //calls the smart contract function while returning the data in variable message
        const message = await Moralis.executeFunction(options)
        // console.log(message);
        setAsset(message)
        }
      
      //getting a task based on the index of the mapping from the smart contract, returns a message object
      async function getTaskDataIndex(i){
        //defining the parameters for the execute function call, which executes a function in the smart contract
        const options = {
        abi: tasks.abi,
        contractAddress: '0x79655a20e9d6BA7296188644d9411f37fFF1f4b8',
        functionName: 'tasks',
        //empty parameter because this getter is generated automatically by solidity on creation of a mapping
        params: {
            '': i,
        }
        }
        //calls the smart contract function while returning the data in variable message
        const message = await Moralis.executeFunction(options)
        console.log('task at index:', message);
        return message
        }

        //getting all asset data and putting them into an array to allow for ease of use, this array is returned 
        async function getAllTasks(){
          await getTaskCount();
          const tempArray = []
          try {
            for (let index = 1; index <= taskCount; index++) {
              const data = await getTaskDataIndex(index);
              tempArray[index] = { id: data.id.toNumber(), content: data.content,assetId: data.assetId.toNumber() ,completed: data.completed , signator: data.signator }
              console.log('inside',data);

            }
          } catch (error) {
          console.log(error);
          }
         console.log('tasks:',tempArray);

          return tempArray;
        }

      //load data and store them in state in state hooks 
      //in order to access them and pass them as props to other pages/components
      async function loadData() {
        const _taskCount = await getTaskCount();

        await setTaskCount(_taskCount)
        await console.log('task count:',_taskCount);

        const taskFromBlockchain = await getAllTasks();
        await setTask(taskFromBlockchain)
        await console.log('task from blockchain:',taskFromBlockchain);

        await getAssetDataIndex(params.id);
        await console.log('asset on page:',asset);

      }


    // if there are asset to display, display them else set screen to loading...
    return asset.length==0 ? (<h1 className='loading-message'> <CircularProgress color="inherit" /> </h1>) :(
        <div className='asset'>
            <div className='asset-task-container'>
                <div className='section asset-display2'> 
                    AssetDisplay2 
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
                        {/* <Button classVar='dark' text={'get tasks'} onClick={()=>{console.log(task)}}/> 
                        <Button classVar='dark' text={'get asset'} onClick={()=>{console.log(asset)}}/> 
                         */}

                        </div>

                        {/* filter task [] to make sure their assetId is related to current asset */}
                        <div className='task-list'>
                            {task.filter(item=>{
                              if (item.assetId == params.id) {
                                return item
                              }
                            }).length == 0 ? 
                            <div className='no-task-message-container'>
                            <small className='no-task-message'>You dont have any tasks at the moment</small>
                            <Link to={`/createTask/${asset.id}`}> <Button classVar='dark' text={'Create Task'}/> </Link> 
                            </div>
                            :
                            <>
                            {task.filter(item=>{
                              if (item.assetId  == params.id) {
                                return item
                              }
                            }).map((item)=>{return(
                            <div className='task' key={item.id}>
                              <p>Description: {item.content}</p> 
                              <p>Asset id: {item.assetId}</p>
                              <p>signator: {item.signator}</p>
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


