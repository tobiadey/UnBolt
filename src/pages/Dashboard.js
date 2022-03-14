import logo from '../logo.svg';
import Button from '../components/Button'
import '../App.css';
import {Link} from 'react-router-dom'
import { useMoralis } from "react-moralis";
import { useState } from 'react'

function onAdd (){
    console.log("Hii");
  }


const Dashboard = () => {
  const { authenticate, isAuthenticated, logout, user } = useMoralis();
  const [asset, setAsset] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (!asset) {
      alert('Please add asset name')
      return
    }
    onAdd({asset})

    setAsset('')
  }

  
  // return (
  //   <div className="">
  //       <div>
  //       <img src={logo} className="App-logo-lar" alt="logo" />
  //       {isAuthenticated ? 
  //           <>
  //               <p>{user.get("ethAddress")}</p>
  //           <Link className = "test" to= '/'> <Button className = "test" color='black' text={'Go Back'} onClick ={ onAdd}/> </Link>
  //               <Button color='black' text={'Logout'} onClick ={logout}/>

  //           </>
  //           :
  //           <>
  //           <Link className = "test" to= '/'> <Button className = "test" color='black' text={'Go Back'} onClick ={ onAdd}/> </Link>
  //           <Button color='black' text={'Connect Wallet'} onClick ={() => authenticate({ provider: "metamask" })}/>


  //           </>
  //       }

  //           <form className ='add-form' onSubmit={onSubmit}>
  //               <div className='form-control'>
  //               <label> Search </label>
  //               <input type='text' placeholder = 'Search...' value = {asset} onChange = {(e) => setAsset(e.target.value)}/>
  //               </div>
  //               <input className = 'btn' type='submit' value = 'Search' />

  //           </form>


  //           <Link to= '/createAsset'> <Button className = "test" color='black' text={'Create Asset'} onClick ={ onAdd}/> </Link>

  //       </div>

  //   </div>
  // );

  return(
    <div className='DashboardContainer'>
    
    </div>
  )
}

export default Dashboard
