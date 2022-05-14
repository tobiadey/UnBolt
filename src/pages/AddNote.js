
import { useState, useEffect } from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import Button from '../components/Button'
import Navbar from '../components/Navbar'
import Input from '../components/Input' //at the moment this is only used to target the css, using componets causes some errors!
import './AddNote.css';
// import assets from '../truffle/build/contracts/Assets.json'
import contractAddress from '../constants/contractAddress';
import unbolt from '../truffle/build/contracts/UnBolt.json'




const AddNote = () => {

  // The useMoralis hook provides all the basics functionalities that is needed for authentication and user data.
  const { Moralis, authenticate, isAuthenticated, enableWeb3,isWeb3Enabled, logout, user } = useMoralis();

  const params = useParams()
  const navigate = useNavigate();

  // state hooks to know which body to use for the dashbaord

  const [note, setNote] = useState('');

  // allows for performing side effects in the component
  // side effect in this case being calling the enableWeb3 function
  // use effect runs after every render
  // if the value of the second argunment changes(isAuthenticated, isWeb3Enabled), useEffect is rerun
  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled){
        enableWeb3({ provider: connectorId });
    }
  }, [isAuthenticated, isWeb3Enabled]);



  async function  onSubmit(e){

    //user is addinng an intermediary 
   if (note != ''){
      await addNote()
      console.log('name:', note );
      await setNote('')
      await alert('Note has been added')


    //user has not enter details in form
    }else{
      alert('add note details before submitting form! ')
    }

  }


  async function addNote(){
    //defining the parameters for the execute function call, which executes a function in the smart contract
    console.log(unbolt.abi)
    const options = {
      abi: unbolt.abi,
      contractAddress: contractAddress.unboltContractAddress,
      functionName: 'addDescription',
      params:{
        _TaskId: params.id,
        _note : note
      }
    }
    //calls the smart contract function while returning the data in variable message
    const message = await Moralis.executeFunction(options)
    return message
  }



  return (
      <>
        <Navbar/>
        <div className='createAsset'>
            {/* <Link to= '/dashboard'> <Button color='black' text={'Go Back'} /> </Link> */}
            <div className='title'>Add Note for task with id: {params.id}</div>
            <div className='createAsset-form'>
                <div className='createAsset-data'>
                    <div className='form-box'>
                        <div className='input'>
                            <label className='input-title'>Note*</label>
                            <div className='input-box'>
                                <input type='text' value={note} placeholder = 'Add New Note...' onChange = {(e) => setNote(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                </div>
        
            </div>

            <div className='createAsset-button-container'>
             <Button text={'Go Back'} onClick={() => navigate(-1)}/>
            <Button text={"Complete"} classVar={'dark'} onClick ={(e) => onSubmit(e)} />
            </div>
        </div>
      </>

  );
}

export default AddNote

