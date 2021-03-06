import './Sidebar.css';
import { useState } from 'react'
import logo from '../images/logo.svg';
import GridViewIcon from '@mui/icons-material/GridView';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import {Link} from 'react-router-dom'

// components for showing the sidebar
//takes in props which it uses to differentiate from other sidebars components
const Sidebar = (props) => {

// useState gives a local state in a function component
// the first paramter is the value and the second is the setter
const [isShown, setIsShown] = useState(false);

function changeBody(value){
    // console.log(value);
    // setBody(value)
    props.handleSetBody(value)
}
// onMouseOver={setIsShown(true)}

    return(
        <div className='sidebar'>
            <div className='top'>
                <span className='logo'> <img src={logo} className="App-logo-small" alt="logo" /> </span>
            </div>

            <div className='middle'>
                <ul>
                    {/* if props.page == dashboard show with style changes or else dont */}
                    { props.page == 'dashboard'?  
                        <li className='hovered'>
                        <GridViewIcon className='icon'/>
                        <span>Dashboard</span>
                        </li>
                    : 
                        <li onClick={(e) => {props.handleSetBody('dashboard')}} >
                        <GridViewIcon className='icon' />
                        {/* <span>Dashboard</span> */}
                        </li>
                    }

                    {/* if props.page == search show with style changes or else dont */}
                    { props.page == 'search'?  
                        <li className='hovered'>
                        <SearchIcon className='icon'/>
                        <span>Search</span>
                        </li>
                    : 
                        <li onClick={(e) => {props.handleSetBody('search')}} >
                        <SearchIcon className='icon' />
                        {isShown && <span>Search3</span> }
                        </li>
                    }

                    {/* if props.page == setting show with style changes or else dont */}

                    { props.page == 'setting'?  
                        <li className='hovered'>
                        <PersonOutlineIcon className='icon'/>
                        <span>Setting</span>
                        </li>
                    : 
                        <li onClick={(e) => {props.handleSetBody('setting')}} >
                        <PersonOutlineIcon className='icon' />
                        {/* <span>Setting</span> */}
                        </li>
                    }


                    <li className='bottom-icon ' onClick={(e) => {console.log("logout")}} >
                        <Link to= '/'> <LogoutIcon className='icon' /> </Link>
                        {/* <span>Logout</span> */}
                    </li>

                   

                </ul>
            </div>
        </div>
    )
  
  }
  
  
  export default Sidebar