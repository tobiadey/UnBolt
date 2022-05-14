
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import Button from '../components/Button'
import Navbar from '../components/Navbar'
import Input from '../components/Input' //at the moment this is only used to target the css, using componets causes some errors!
import './CreateAsset.css';
// import assets from '../truffle/build/contracts/Assets.json'
import contractAddress from '../constants/contractAddress';
import unbolt from '../truffle/build/contracts/UnBolt.json'



function onAdd (name,description,quantity){
    console.log(name, ":", description, ":",quantity);
  }

const CreateAsset = () => {
    // The useMoralis hook provides all the basics functionalities that is needed for authentication and user data.
    const { authenticate, isAuthenticated, enableWeb3,isWeb3Enabled, logout, user } = useMoralis();
   
    // The useWeb3ExecuteFunction hook is used to execute on-chain functions.
    // to call the on chain functions, an abi, contract address, functionName and params need to be specified
    const {fetch, error, data} = useWeb3ExecuteFunction();

    // useState gives a local state in a function component
    // the first paramter is the value and the second is the setter
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [complete, setComplete] = useState(false)
    const [image, setImage] = useState('')

    // allows for performing side effects in the component
    // side effect in this case being calling the enableWeb3 function
    // use effect runs after every render
    // if the value of the second argunment changes(isAuthenticated, isWeb3Enabled), useEffect is rerun
    useEffect(() => {
        const connectorId = window.localStorage.getItem("connectorId");
        if (isAuthenticated && !isWeb3Enabled)
          enableWeb3({ provider: connectorId });
      }, [isAuthenticated, isWeb3Enabled]);
    
// function for handling the submition of a form
// calls the smart contract function then clears the form
 async function  onSubmit(e){
    console.log(unbolt.abi);
    e.preventDefault()

    //check if any input is missing 
    if (!name | !description | !quantity) {
        alert('Fill in the missing field')
        return
      }
  
    // console.log(assets.abi);
    const options = {
      abi: unbolt.abi,
      contractAddress: contractAddress.unboltContractAddress,
      functionName: 'createAsset',
      params: {
        _assetName: name,
        _description: description,
        _quantity: quantity
      }
    }
    // calling of the smart contract function using the options const as a parameter
    const message = await fetch({params: options})
    console.log(message);

    
  
    await console.log("Error: ",error);
    await console.log("Data: ",data);


    // for test purposes just print it in the onAdd function
    // onAdd({name,description,quantity})

    // set the local state to default (this changes the value in the form as the asset has already been created)
    setName('')
    setDescription('')
    setQuantity(0)
    setComplete(false)
  }
  
  return (
      <>
        <Navbar/>
        <div className='createAsset'>
            {/* <Link to= '/dashboard'> <Button color='black' text={'Go Back'} /> </Link> */}
            <div className='title'>Add an Asset</div>
            <div className='createAsset-form'>
                <div className='createAsset-data'>
                    <div className='form-box'>
                        <div className='input'>
                            <label className='input-title'>Name*</label>
                            <div className='input-box'>
                                <input type='text' value={name} placeholder = 'Add Asset Name...' onChange = {(e) => setName(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className='form-box'>
                        <div className='input'>
                            <label className='input-title'>Asset Description*</label>
                            <div className='input-box'>
                                <input type='text' value={description} placeholder = 'Add New Description...' onChange = {(e) => setDescription(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className='form-box'>
                        <div className='input'>
                            <label className='input-title'>Quantity*</label>
                            <div className='input-box'>
                                <input type='number' value={quantity} onChange = {(e) => setQuantity(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='createAsset-image-container'>
                    <input type="file"/>
                </div>
            </div>

            <div className='createAsset-button-container'>
            <Link to= '/dashboard'> <Button text={'Go Back'} /> </Link>
            <Button text={"Complete"} classVar={'dark'} onClick ={(e) => onSubmit(e)} />
            </div>
        </div>
      </>

  );
}

export default CreateAsset

