import logo from '../logo.svg';
import Button from '../components/Button'
import './HomePage.css';
import {Link} from 'react-router-dom'
import { useMoralis } from "react-moralis";

function onAdd (){
    console.log("Hii");
  }


const HomePage = ({}) => {
  const { authenticate, isAuthenticated, logout, user } = useMoralis();


  
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

            {isAuthenticated ? (
              <>
                <Button classVar='dark' color='white' text={'Logout'} onClick ={logout}/>
                {console.log(user.get("username"))}
                {console.log(user.get("ethAddress"))}  
              </>
            ) : (
            <Button classVar='dark' text={'Connect Wallet'} onClick ={() => authenticate({ provider: "metamask" })}/>

            )}
            <Link to= 'about'> <Button text={'Read More'} /> </Link>
            </div>
        </div>


        <div className='container'>
          { isAuthenticated && 
          <Link to= 'dashboard'> <Button classVar='dark' text={'Go to App'}/> </Link> 
          }
        </div>


    </div>
  );
}

export default HomePage
