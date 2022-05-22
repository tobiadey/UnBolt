import './Navbar.css';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import FaceIcon from '@mui/icons-material/Face';
import { useMoralis } from "react-moralis";
import {Link} from 'react-router-dom'

// components for showing the navbar
const Navbar = () => {
 // The useMoralis hook provides all the basics functionalities that is needed for authentication and user data.
    const { authenticate, isAuthenticated, logout, user } = useMoralis();

    return(
        <div className='navbar'>
            <div className='nav-wrapper'>

                <h3 className='message'>Welcome back to UnBolt, {user.get('username').toUpperCase()} </h3>
                <div className='items'>
                    <>
                        {/* display user or else display small */}
                        {user ? <small>{
                        
                        <Link  to={`/profile/${user.get('username')}`}> {user.get("ethAddress")} </Link>

                        
                        }</small> : <small>idk</small> }

                    </>
                </div>
            </div>
        </div>
    )
  
  }
  
  
  export default Navbar