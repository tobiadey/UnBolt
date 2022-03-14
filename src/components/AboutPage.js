import logo from '../logo.svg';
import Button from './Button'
import '../App.css';
import {Link} from 'react-router-dom'
import { useMoralis } from "react-moralis";


function onAdd (){
    console.log("Hii");
  }

const AboutPage = () => {
  const { authenticate, isAuthenticated, logout, user } = useMoralis();

  
  return (
    <div className="">
        <div className='display-inline'>
        <img src={logo} className="App-logo-sma" alt="logo" />
        {/* {check if user is already connected} */}
        {isAuthenticated ?
        <>
          <small>{user.get("ethAddress")}</small>
          <Button color='black' text={'Logout'} onClick ={ logout}/> 
        </>
          :
          <Button color='black' text={'Connect Wallet'} onClick ={() => authenticate({ provider: "metamask" })}/> 
         }
        </div>
        <div className='container'>
            {/* how to add className to a component declration */}
            {/* use className as a prop to butoon */}
            <Link className = "test" to= '/'> <Button className = "test" color='black' text={'Go Back'} onClick ={ onAdd}/> </Link>

            <h2 className='desc'> Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h2>
            <small className='desc'> 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Risus tellus scelerisque nunc odio viverra senectus. 
                Dui sollicitudin ornare a ornare morbi posuere maecenas sagittis, nisi.
            </small>
        </div>
    </div>
  );
}

export default AboutPage
