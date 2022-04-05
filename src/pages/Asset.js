import { useState, useEffect } from 'react'
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import assets from '../truffle/build/contracts/Assets.json'
import { useParams, Navigate, useNavigate, useLocation} from 'react-router-dom'
import './Asset.css';
import Button from '../components/Button'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Task } from '@mui/icons-material';
import {Link} from 'react-router-dom'

const Asset = () => {
    const { authenticate, isAuthenticated, logout, user, enableWeb3,isWeb3Enabled,Moralis } = useMoralis();
    const [loading, setLoading] = useState(true)
    const [asset, setAsset] = useState([])
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
              await setTimeout(function() { getAssetDataIndex(params.id)}, 1000);
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
      [isAuthenticated, isWeb3Enabled, asset,loading]);

    
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
        console.log(message);
        setAsset(message)
        }

    // if there are asset to display, display them else set screen to loading...
    return asset.length==0 ? (<h1 className='loading-message'> Loading... </h1>) :(
        <div className='asset'>
            <div className='asset-task-container'>
                <div className='section asset-display2'> 
                    AssetDisplay2 
                </div>
                <div className='section task-display'> 
                    <div className='task-header'>
                        <p>Dashboard/ {asset.assetName} / Tasks</p>
                        <a onClick= {() => {navigate(-1)}}> 
                         <ArrowBackIosNewIcon className='icon'/> Back to Dashboard
                        </a>
                    </div>
                    <div className='task-content'>
                        <div className=''>
                        <h1>Task</h1>
                        <p>View tasks allocated to the production of this asset</p>
                        </div>

                        <div className='task-list'>
                            {task.length == 0 ? 
                            <>
                            <Link to={`/createTask/${asset.id}`}> <Button classVar='dark' text={'Create Task'}/> </Link> 
                            </>
                            :
                            <>
                                <div className='task'>task</div>
                                <div className='task'>task</div>
                                <div className='task'>task</div>
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