import {Link} from 'react-router-dom'
import { useMoralis } from "react-moralis";
import Button from '../components/Button'
import './About.css';

//page that handles when a user tries to access a page they should not be on due to not being authenticated
function NoAccess() {

     // The useMoralis hook provides all the basics functionalities that is needed for authentication and user data.
    const { authenticate, isAuthenticated, logout, user } = useMoralis();

    return(
      <div className='about-page-container'>
        <div className='header display-inline'>
          {/* {check if user is already connected} */}
          {isAuthenticated ?
          // if true show:
          <>
  
          <>
          <div className='back-btn'>
            <Link to= '/'> <Button text={'Back'}/> </Link>
          </div>
          </>
  
          <>
          <small>{user.get("ethAddress")}</small>
          <Button text={'Logout'} onClick ={logout}/> 
          </>
  
          </>
          :
          // if false show:
          <>
          <Link to= '/'> <Button text={'Back'}/> </Link>
          <Button  text={'Connect Wallet'} onClick ={() => authenticate({ provider: "metamask" })}/> 
          </>
  
          }
        </div>
        <div className='about-body-container'>
          <div className='left-about'>
            No Access to this page, please connect wallet or go back to the home page
          </div>
        </div>
      </div>
    );
  }
  
  
  export default NoAccess;
  