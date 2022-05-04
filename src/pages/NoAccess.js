import {Link} from 'react-router-dom'
import { useMoralis } from "react-moralis";
import Button from '../components/Button'

//page that handles when a user tries to access a page they should not be on due to not being authenticated
function NoAccess() {

     // The useMoralis hook provides all the basics functionalities that is needed for authentication and user data.
    const { authenticate, isAuthenticated, logout, user } = useMoralis();
    return (
     <>
         <Link to= '/'> back </Link> 
         No Access to this back please login
        <Button  text={'Connect Wallet'} onClick ={() => authenticate({ provider: "metamask" })}/> 
        {/* on login redirect user to dashboard or homepage */}
     </>
    );
  }
  
  
  export default NoAccess;
  