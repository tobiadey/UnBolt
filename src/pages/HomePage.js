import { useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import assets from '../truffle/build/contracts/Assets.json'
import logo from '../logo.svg';
import Button from '../components/Button'
import './HomePage.css';




const HomePage = ({}) => {
  const { authenticate, isAuthenticated, logout, user, enableWeb3,isWeb3Enabled,Moralis } = useMoralis();
  const {fetch, error, data} = useWeb3ExecuteFunction();


  useEffect(() => {
    // gotten from moralis page 
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled)
      enableWeb3({ provider: connectorId });
  }, [isAuthenticated, isWeb3Enabled]);


  async function test(){
  // const web3Provider = await enableWeb3();
  const readOptions = {
    contractAddress: '0x79433D3eE2172d66f580ea0D1064e987c0F44DbC',
    functionName: "assetCount",
    abi: assets.abi,
  };
  const message = await Moralis.executeFunction(readOptions);
  console.log(message.toNumber());
  }

  async function test2(){
    const options = {
      abi: assets.abi,
      contractAddress: '0x79433D3eE2172d66f580ea0D1064e987c0F44DbC',
      functionName: 'assets',
      params: {
        '': 7,
      }
    }
    const message = await Moralis.executeFunction(options);
    console.log(message);
    console.log(message.assetName);
    }
  
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
                {/* {console.log(user.get("username"))}
                {console.log(user.get("ethAddress"))}   */}
              </>
            ) : (
            <Button classVar='dark' text={'Connect Wallet'} onClick ={() => authenticate({ provider: "metamask" })}/>

            )}
            <Link to= 'about'> <Button text={'Read More'}  /> </Link>
            </div>
        </div>


        <div className='container'>
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

export default HomePage
