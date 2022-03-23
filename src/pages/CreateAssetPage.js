// import logo from '../logo.svg';
import Button from '../components/Button'
import Navbar from '../components/Navbar'
import Input from '../components/Input' //at the moment this is only used to target the css, using componets causes some errors!
import './CreateAssetPage.css';
import {Link} from 'react-router-dom'
import { useMoralis } from "react-moralis";
import { useState } from 'react'

function onAdd (name,description,quantity){
    console.log(name, ":", description, ":",quantity);
  }

const CreateAssetPage = ({}) => {
  const { authenticate, isAuthenticated, logout, user } = useMoralis();
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [complete, setComplete] = useState(false)
  const [image, setImage] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

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
                    <input type="file" value={image}/>
                </div>
            </div>

            <div className='createAsset-button-container'>
            <Link to= '/dashboard'> <Button color='black' text={'Go Back'} /> </Link>
            <Button text={"Complete"} onClick ={(e) => onSubmit(e)} />
            </div>
        </div>
      </>

  );
}

export default CreateAssetPage


{/* <div className="createAsset">
        <div className='createAsset-container'>
            <div className='form-div'>
                <Link to= '/dashboard'> <Button color='black' text={'Go Back'} /> </Link>
                <p>Add an asset</p>
                <form className ='add-form' onSubmit={onSubmit}>
                    <div className='form-control'>
                        <label> Task </label>
                        <input type='text' placeholder = 'Add New Task' value = {text} onChange = {(e) => setText(e.target.value)}/>
                    </div>

                    <div className='form-control '>
                        <label> Day Time </label>
                        <input type='text' placeholder = 'Add DayTime' value = {day} onChange = {(e) => setDay(e.target.value)} />
                    </div>

                    <div className='form-control form-control-check'>
                        <label> Set Reminder </label>
                        <input type='checkbox' checked= {reminder} value = {reminder} onChange = {(e) => setReminder(e.currentTarget.checked)} />
                    </div>

                    <input className = 'btn btn-block' type='submit' value = 'Add Task' />

                </form>
                <div className='uplaodImage-container'>
                    IMG
                </div>
            </div>

        </div>
        <Button text={'Complete'}/>
    </div> */}