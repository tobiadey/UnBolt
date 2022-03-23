// import logo from '../logo.svg';
import Button from '../components/Button'
import Input from '../components/Input'
import './CreateAssetPage.css';
import {Link} from 'react-router-dom'
import { useMoralis } from "react-moralis";
import { useState } from 'react'

function onAdd (){
    console.log("hii");
  }

const CreateAssetPage = ({}) => {
  const { authenticate, isAuthenticated, logout, user } = useMoralis();
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [complete, setComplete] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    if (!name) {
      alert('Please add a task description')
      return
    }
    onAdd({name,description,quantity})

    setName('')
    setDescription('')
    setQuantity(0)
    setComplete(false)
  }



  
  return (
    <div className='createAsset'>
        <Link to= '/dashboard'> <Button color='black' text={'Go Back'} /> </Link>
        <div className='title'>Add an Asset</div>
        <div className='createAsset-form'>
            <div className='createAsset-data'>
                <div className='form-box'>
                    <Input title={"Asset Name"} value = {text}  onChange = {(e) => setName(e.target.value)} />
                </div>
                <div className='form-box'>
                    <Input title={"Asset Description"}/>
                </div>
                <div className='form-box'>
                    <Input title={"Quantity"}/>
                </div>
            </div>
            <div className='createAsset-image-container'>
                Upload Image
            </div>
        </div>
       
        <div className='createAsset-button-container'>
            <Button text={"Complete"} onClick ={(e) => onSubmit()} />
            </div>
        
        
        
        
    </div>
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