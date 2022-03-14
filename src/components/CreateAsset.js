// import logo from '../logo.svg';
import Button from './Button'
import '../App.css';
import {Link} from 'react-router-dom'
import { useMoralis } from "react-moralis";
import { useState } from 'react'

function onAdd (){
    console.log("Hii");
  }


const CreateAsset = ({}) => {
  const { authenticate, isAuthenticated, logout, user } = useMoralis();
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    if (!text) {
      alert('Please add a task description')
      return
    }
    onAdd({text,day,reminder})

    setText('')
    setDay('')
    setReminder(false)
  }

  
  return (
    <div className="">
        <div>
            <Link to= '/dashboard'> <Button color='black' text={'Go Back'} /> </Link>

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
        </div>
    </div>
  );
}

export default CreateAsset
