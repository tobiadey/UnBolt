import './Sidebar.css';
import logo from '../logo.svg';
import GridViewIcon from '@mui/icons-material/GridView';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import {Link} from 'react-router-dom'

const Sidebar = ({page}) => {


    return(
        <div className='sidebar'>
            <div className='top'>
                <span className='logo'> <img src={logo} className="App-logo-small" alt="logo" /> </span>
            </div>

            <div className='middle'>
                <ul>
                    { page == 'dashboard'?  
                        <li className='hovered'>
                        <GridViewIcon className='icon'/>
                        {/* <span>Dashboard</span> */}
                        </li>
                    : 
                        <li>
                        <GridViewIcon className='icon'/>
                        {/* <span>Dashboard</span> */}
                        </li>
                    }
                    
                    { page == 'search'?  
                        <li className='hovered'>
                        <SearchIcon className='icon'/>
                        {/* <span>Search</span> */}
                        </li>
                    : 
                        <li>
                        <SearchIcon className='icon'/>
                        {/* <span>Search</span> */}
                        </li>
                    }
                    { page == 'setting'?  
                        <li className='hovered'>
                        <PersonOutlineIcon className='icon'/>
                        {/* <span>Setting</span> */}
                        </li>
                    : 
                        <li>
                        <PersonOutlineIcon className='icon'/>
                        {/* <span>Setting</span> */}
                        </li>
                    }


                    <li className='bottom-icon' onClick={(e) => {console.log("clicking")}} >
                        <LogoutIcon className='icon' />
                        {/* <span>Logout</span> */}
                    </li>

                    <Link to= '/'> back </Link>

                </ul>
            </div>
        </div>
    )
  
  }
  
  
  export default Sidebar