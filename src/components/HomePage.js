import logo from '../logo.svg';
import Button from './Button'
import '../App.css';
import {Link} from 'react-router-dom'
import { useMoralis } from "react-moralis";

function onAdd (){
    console.log("Hii");
  }


const HomePage = ({}) => {
  const { enableWeb3, isWeb3Enabled } = useMoralis();

  
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

            {isWeb3Enabled ? (
              <>
                <Button color='black' text={'Go to App'} onClick ={() => onAdd()}/>
              </>

            ) : (
            <Button color='black' text={'Connect Wallet'} onClick ={() => enableWeb3()}/>

            )}
            <Link to= 'about'> <Button color='black' text={'Read More'} /> </Link>
            </div>

        </div>

    </div>
  );
}

export default HomePage
