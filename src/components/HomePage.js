import logo from '../logo.svg';
import Button from './Button'
import '../App.css';
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
                <Button color='black' text={'Logout'} onClick ={logout}/>
                {console.log(user.get("username"))}
                {console.log(user.get("ethAddress"))}  
              </>
            ) : (
            <Button color='black' text={'Connect Wallet'} onClick ={() => authenticate({ provider: "metamask" })}/>

            )}
            <Link to= 'about'> <Button color='black' text={'Read More'} /> </Link>
            </div>

        </div>

        <div>
        
        
        { isAuthenticated && 
        <Link to= 'dashboard'> <Button color='black' text={'Go to App'}/> </Link> 
        }
        
        </div>

    </div>
  );
}

export default HomePage
