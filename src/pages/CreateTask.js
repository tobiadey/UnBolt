import { useState, useEffect } from 'react'
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import './CreateTask.css';
import Button from '../components/Button'
import Navbar from '../components/Navbar'
import Dropdown from '../components/Dropdown'
import { useParams,Link, Navigate, useNavigate, useLocation} from 'react-router-dom'
// import tasks from '../truffle/build/contracts/Tasks.json'
import contractAddress from '../constants/contractAddress';
import unbolt from '../truffle/build/contracts/UnBolt.json'


const CreateTask = () => {
    const navigate = useNavigate()
    const params = useParams()
     // The useMoralis hook provides all the basics functionalities that is needed for authentication and user data.
    const { Moralis, authenticate, isAuthenticated, enableWeb3,isWeb3Enabled, logout, user } = useMoralis();

    // The useWeb3ExecuteFunction hook is used to execute on-chain functions.
    // to call the on chain functions, an abi, contract address, functionName and params need to be specified
    const {fetch, error, data} = useWeb3ExecuteFunction();

    // useState gives a local state in a function component
    // the first paramter is the value and the second is the setter
    const [content, setContent] = useState('')
    const [creatorMessage, setCreatorMessage] = useState('')
    const [signator, setSignator] = useState('')
    const [intermedairyList, setIntermediaryList]= useState([])

    // allows for performing side effects in the component
    // side effect in this case being calling the enableWeb3 function
    // use effect runs after every render
    // if the value of the second argunment changes(isAuthenticated, isWeb3Enabled), useEffect is rerun
    useEffect(() => {
        const connectorId = window.localStorage.getItem("connectorId");
        if (isAuthenticated && !isWeb3Enabled){
          enableWeb3({ provider: connectorId });
        }
        if(intermedairyList.length < 1){
        getAllIntermediaries()
      }
      }, [isAuthenticated, isWeb3Enabled,intermedairyList]);
    

  //getting an asset data based on the index of the mapping from the smart contract, returns a message object
  async function getAssetDataIndex(){
    //defining the parameters for the execute function call, which executes a function in the smart contract
    const options = {
    abi: unbolt.abi,
    contractAddress: contractAddress.unboltContractAddress,
    functionName: 'assets',
    //empty parameter because this getter is generated automatically by solidity on creation of a mapping
    params: {
        '': params.id,
    }
    }
    //calls the smart contract function while returning the data in variable message
    const message = await Moralis.executeFunction(options)
    console.log(message);
    return message.creator
  }

    
  function onAdd (one,two,three){
  console.log(one, ":", two,":",three);
  }

  async function  onSubmit(e){
    await e.preventDefault()
    if (!content | !creatorMessage| !signator ) {
      alert('Fill in the missing field')
      return
    }

    const creator = await getAssetDataIndex();

    await setSignator(creator)
    //check that the signed in user is the asset creator for the asset they are trying to change
    const _currUser = await user.get("ethAddress")

    if ( _currUser.toLowerCase() != creator.toLowerCase() ){
      await alert('User does not have access to add task to this application')
      console.log(_currUser, "L", creator);
      return
    }

    // maybe take in props which is the asset id which is the params.id
    console.log(unbolt.abi);
    console.log(params.id);
    const options = {
      abi: unbolt.abi,
      contractAddress: contractAddress.unboltContractAddress,
      functionName: 'createTask',
      params: {
        _taskContent: content,
        _note: creatorMessage,
        _assetId: params.id,
        _signator: signator
      }
    }
    const message = await fetch({params: options})
    console.log(message);

    await console.log("Error: ",error);
    await console.log("Data: ",data);

 
    setContent('')
    setCreatorMessage('')
    setSignator('')
    alert("Task Created Go back to Asset page to View :)")
  }

  // function for getting all the intermediaries related to a current user
  async function getAllIntermediaries(){
  const Intermediary = Moralis.Object.extend("Intermediary");
  const query = new Moralis.Query(Intermediary);
  // query.equalTo("user", user.get('username'));
  query.equalTo("users", Moralis.User.current());
  const results = await query.find();
  // alert("Successfully retrieved " + results.length + " intermediaries.");
  setIntermediaryList(results)
  // Do something with the returned Moralis.Object values
  // for (let i = 0; i < results.length; i++) {
  //   const object = results[i];
    // alert(object.id + " - " + object.get("ownerName"));
  //   console.log(object);
  //   console.log(object.get("user") + " created intermedairy relationship with " + object.get("name"));
  // }
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
                              <label className='input-title'>Task Description</label>
                              <div className='input-box'>
                                  <input type='text' value={content} placeholder = 'Add New Description...' onChange = {(e) => setContent(e.target.value)}/>
                              </div>
                          </div>
                      </div>
                      <div className='form-box'>
                          <div className='input'>
                              <label className='input-title'>Creators Message</label>
                              <div className='input-box'>
                                  <input type='text' value={creatorMessage} placeholder = 'Add New Message...' onChange = {(e) => setCreatorMessage(e.target.value)}/>
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
                      <div className='form-box'>
                          <div className='select'>
                             <label className='select-title'>Search Intermediaries</label>
                              <div className='select-box'>
                                <select value={signator} onChange={(e) => setSignator(e.target.value)}>
                                  <option defaultValue>None</option>
                                  { intermedairyList.length > 0 && 
                                      <>
                                        { intermedairyList.map((item)=>{
                                        // console.log(item.get("name"));
                                        return(
                                        <option key={item.id} value={item.attributes.ethAddress}>{item.get("name")}</option>
                                        );
                                        })
                                        }
                                      </>
                                  }
                                </select>
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
  
  
  export default CreateTask