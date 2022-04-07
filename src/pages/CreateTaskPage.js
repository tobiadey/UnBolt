import { useState, useEffect } from 'react'
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import './CreateTaskPage.css';
import Button from '../components/Button'
import Navbar from '../components/Navbar'
import { useParams,Link, Navigate, useNavigate, useLocation} from 'react-router-dom'
import tasks from '../truffle/build/contracts/Tasks.json'


const CreateTaskPage = () => {
    const navigate = useNavigate()
    const params = useParams()
    const { authenticate, isAuthenticated, enableWeb3,isWeb3Enabled, logout, user } = useMoralis();
    const {fetch, error, data} = useWeb3ExecuteFunction();
    const [content, setContent] = useState('')
    const [signator, setSignator] = useState('')


    useEffect(() => {
        const connectorId = window.localStorage.getItem("connectorId");
        if (isAuthenticated && !isWeb3Enabled)
          enableWeb3({ provider: connectorId });
      }, [isAuthenticated, isWeb3Enabled]);
    
    function onAdd (name,description){
    console.log(name, ":", description);
    }
    async function  onSubmit(e){
        e.preventDefault()
    
        console.log(tasks.abi);
        const options = {
          abi: tasks.abi,
          contractAddress: '0xBaab56D8B51736e99BaAd8a40f67D5a171a7C205',
          functionName: 'createTask',
          params: {
            _taskcontent: content,
            assetId: params.id,
            signator: signator
          }
        }
        await fetch({
          params: options
        })
        await console.log("Error: ",error);
        await console.log("Data: ",data);
    
        if (!content | !signator ) {
          alert('Fill in the missing field')
          return
        }
        onAdd({content,signator})
    
        setContent('')
        setSignator('')
      }

    return (
        <>
          <Navbar/>
          <div className='createAsset'>
              {/* <Link to= '/dashboard'> <Button color='black' text={'Go Back'} /> </Link> */}
              <div className='title'>Add a Task</div>
              <div className='createAsset-form'>
                  <div className='createAsset-data'>
                      <div className='form-box'>
                          <div className='input'>
                              <label className='input-title'>Task Description/content</label>
                              <div className='input-box'>
                                  <input type='text' value={content} placeholder = 'Add New Description...' onChange = {(e) => setContent(e.target.value)}/>
                              </div>
                          </div>
                      </div>
                      <div className='form-box'>
                          <div className='input'>
                              <label className='input-title'>Signator</label>
                              <div className='input-box'>
                                  <input type='text' value={signator} placeholder = 'Add Signator...' onChange = {(e) => setSignator(e.target.value)}/>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
  
              <div className='createAsset-button-container'>
              <Link to= {`/asset/${params.id}`}> <Button text={'Go Back'} /> </Link>
              <Button text={"Complete"} classVar={'dark'} onClick ={(e) => onSubmit(e)} />
              </div>
          </div>
        </>
  
    );
  
  }
  
  
  export default CreateTaskPage