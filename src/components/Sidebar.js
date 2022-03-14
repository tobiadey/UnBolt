import './Sidebar.css';
import logo from '../logo.svg';
import GridViewIcon from '@mui/icons-material/GridView';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CropFreeIcon from '@mui/icons-material/CropFree';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = ({props}) => {


    return(
        <div className='sidebar'>
            <div className='top'>
                <span className='logo'> <img src={logo} className="App-logo-small" alt="logo" /> </span>
            </div>

            <div className='middle'>
                <ul>
                    <li>
                        <GridViewIcon className='icon'/>
                        {/* <span>Dashboard</span> */}
                    </li>
                    <li>
                        <CropFreeIcon className='icon'/>
                        {/* <span>Something</span> */}
                    </li>
                    <li>
                        <PersonOutlineIcon className='icon'/>
                        {/* <span>Users</span> */}
                    </li>
                    <li>
                        <SettingsIcon className='icon'/>
                        {/* <span>Settings</span> */}
                    </li>

                    <li className='bottom-icon'>
                        <LogoutIcon className='icon'/>
                        {/* <span>Logout</span> */}
                    </li>

                </ul>
            </div>
        </div>
    )
  
  }
  
  
  export default Sidebar