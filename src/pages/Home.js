import { useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useMoralis} from "react-moralis";
import assets from '../truffle/build/contracts/Assets.json'
import logo from '../logo.svg';
import Button from '../components/Button'
import './Home.css';




const Home = ({}) => {
   // The useMoralis hook provides all the basics functionalities that is needed for authentication and user data.
  const { authenticate, isAuthenticated, logout, enableWeb3,isWeb3Enabled } = useMoralis();
  // const {fetch, error, data} = useWeb3ExecuteFunction();

  // allows for performing side effects in the component
  // side effect in this case being calling the enableWeb3 function
  // use effect runs after every render
  // if the value of the second argunment changes(isAuthenticated, isWeb3Enabled), useEffect is rerun
  useEffect(() => {

    // use a snipped of this code for the logic of this useEffect
    // https://stackoverflow.com/questions/71332997/javascript-window-confirm-automatically-selects-cancel-on-switching-tabs-or-i
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled)
      enableWeb3({ provider: connectorId });
  }, [isAuthenticated, isWeb3Enabled]);


  
  return (
    <div className="App App-home-body">
        <div>
        <img src={logo} className="App-logo-lar" alt="logo" />
        </div>

        <div className='container'>
            <h2 className='desc'> A decentralised supply chain tracker </h2>
            <small className='desc'> 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Risus tellus scelerisque nunc odio viverra senectus. 
                Dui sollicitudin ornare a ornare morbi posuere maecenas sagittis, nisi.
            </small>
        </div>

        <div className='container'>
            <div className='row'>

            {/* check if user is authenticated */}
            {isAuthenticated ? (
              // if true show:
              <>
              {/* logout button */}
                <Button classVar='dark' color='white' text={'Logout'} onClick ={logout}/>
                {/* {console.log(user.get("username"))}
                {console.log(user.get("ethAddress"))}   */}
              </>
            ) : 
            // if false show:
            (
            <Button classVar='dark' text={'Connect Wallet'} onClick ={() => authenticate({ provider: "metamask" })}/>
            )}
            <Link to= 'about'> <Button text={'Read More'}  /> </Link>
            </div>
        </div>


        <div className='container'>
          {/* check if user is authenticated if true show else, show nothing */}
          { isAuthenticated && 
          <>
            <Link to= 'dashboard'> <Button classVar='dark' text={'Go to App'}/> </Link> 
            {/* <Button classVar='dark' text={'Test Function'} onClick={()=> test2()}/>  */}
          </>
    
          }
        </div>
    </div>
  );
}

export default Home
