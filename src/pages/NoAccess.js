import {Link} from 'react-router-dom'
import { useMoralis } from "react-moralis";
import Button from '../components/Button'

function NoAccess() {

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
  