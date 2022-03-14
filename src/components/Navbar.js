import './Navbar.css';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import FaceIcon from '@mui/icons-material/Face';

const Navbar = ({props}) => {


    return(
        <div className='navbar'>
            <div className='nav-wrapper'>
                <div className='search'>
                    <input type='text' placeholder= 'Search...'></input>
                    <SearchIcon className='icon'/>
                </div>
                <div className='items'>
                    <div className='item alert'> 
                    <NotificationsActiveIcon className='icon'/> 
                    <div className='counter'> 1 </div>
                    </div>

                    <div className='item'> tobiadey.eth</div>
                    <div className='item'> <FaceIcon className='icon avatar'/> </div>

                </div>
            </div>
        </div>
    )
  
  }
  
  
  export default Navbar