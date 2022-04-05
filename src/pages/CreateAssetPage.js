
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import Button from '../components/Button'
import Navbar from '../components/Navbar'
import Input from '../components/Input' //at the moment this is only used to target the css, using componets causes some errors!
import './CreateAssetPage.css';
import assets from '../truffle/build/contracts/Assets.json'

function onAdd (name,description,quantity){
    console.log(name, ":", description, ":",quantity);
  }

const CreateAssetPage = ({}) => {
    const { authenticate, isAuthenticated, enableWeb3,isWeb3Enabled, logout, user } = useMoralis();
    const {fetch, error, data} = useWeb3ExecuteFunction();
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [complete, setComplete] = useState(false)
    const [image, setImage] = useState('')
    useEffect(() => {
        const connectorId = window.localStorage.getItem("connectorId");
        if (isAuthenticated && !isWeb3Enabled)
          enableWeb3({ provider: connectorId });
      }, [isAuthenticated, isWeb3Enabled]);
    
 async function  onSubmit(e){
    e.preventDefault()

    console.log(assets.abi);
    const options = {
      abi: assets.abi,
      contractAddress: '0x71D6B1f99f3832FF199753Bb0469fd25456A6C43',
      functionName: 'createAsset',
      params: {
        _assetName: name,
        quantity: quantity
      }
    }
    await fetch({
      params: options
    })
    await console.log("Error: ",error);
    await console.log("Data: ",data);

    if (!name | !description | !quantity) {
      alert('Fill in the missing field')
      return
    }
    onAdd({name,description,quantity})

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
                            <label className='input-title'>Name</label>
                            <div className='input-box'>
                                <input type='text' value={name} placeholder = 'Add Asset Name...' onChange = {(e) => setName(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className='form-box'>
                        <div className='input'>
                            <label className='input-title'>Asset Description</label>
                            <div className='input-box'>
                                <input type='text' value={description} placeholder = 'Add New Description...' onChange = {(e) => setDescription(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className='form-box'>
                        <div className='input'>
                            <label className='input-title'>Quantity</label>
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

export default CreateAssetPage

