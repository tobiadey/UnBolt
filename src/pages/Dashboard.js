import { useEffect,useState } from 'react'
import {Link} from 'react-router-dom'
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import assets from '../truffle/build/contracts/Assets.json'
import Table from '../components/Table'
import Button from '../components/Button'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import SearchIcon from '@mui/icons-material/Search';
import './Dashboard.css';
import logo from '../logo.svg';
import { ProductionQuantityLimits } from '@mui/icons-material';





const Dashboard = () => {

  const { authenticate, isAuthenticated, logout, user, enableWeb3,isWeb3Enabled,Moralis } = useMoralis();
  const [assetCount, setAssetCount] = useState(0)
  const [asset, setAsset] = useState([]);


    //this function is run on each render/loading of the page
    useEffect(() => {
      const loadPage = async () => {
        //ge the connectorID using the console window 
        const connectorId = window.localStorage.getItem("connectorId");
        try {
          //check if authicated and web3 is not enabled in order
          if (isAuthenticated && !isWeb3Enabled){
            //enable web3 and store in a varible
            const web3Provider = await enableWeb3({ provider: connectorId });
          }
          //checking if the asset has already been loaded with the data, if (length==0) then no data has been loaded
          if(asset.length == 0){
            // call the function loadData() but wait 1 second before doing this in order to let enableweb3() run above
            await setTimeout(function() { loadData(); }, 1000);
          }
        } catch (error) {
          console.log(error);
        }
      }
      // call the function loadPage on each render of the page
      loadPage()
    }, 
    //callback functions
    [isAuthenticated, isWeb3Enabled, asset]);


  //gett asset count from the smart contract by calling function assetCount() which returns the asset count
  async function getAssetCount(){
    //defining the parameters for the execute function call, which executes a function in the smart contract
    const readOptions = {
      contractAddress: '0x9424470461F07135B35C09742A71fCE758d2e4FA',
      functionName: "assetCount",
      abi: assets.abi,
    };
    //calls the smart contract function while returning the data in variable message
    const message = await Moralis.executeFunction(readOptions);
    setAssetCount(message.toNumber())
    }

  //getting an asset data based on the index of the mapping from the smart contract, returns a message object
  async function getAssetDataIndex(i){
    //defining the parameters for the execute function call, which executes a function in the smart contract
    const options = {
      abi: assets.abi,
      contractAddress: '0x9424470461F07135B35C09742A71fCE758d2e4FA',
      functionName: 'assets',
      //empty parameter because this getter is generated automatically by solidity on creation of a mapping
      params: {
        '': i,
      }
    }
    //calls the smart contract function while returning the data in variable message
    const message = await Moralis.executeFunction(options)

    return message;
    }

  //getting all asset data and putting them into an array to allow for ease of use, this array is returned 
  async function getAllAssets(){
    await getAssetCount();
    const tempArray = []
    try {
      for (let index = 1; index <= assetCount; index++) {
        const data = await getAssetDataIndex(index);
        tempArray[index] = { id: data.id.toNumber(), assetName: data.assetName, completed: data.completed , quantity: data.quantity.toNumber() }
      }
    } catch (error) {
      console.log(error);
    }
    return tempArray;
  }

  //load data and store them in state in state hooks 
  //in order to access them and pass them as props to other pages/components
  async function loadData() {
    const _assetCount = await getAssetCount();
    await setAssetCount(_assetCount)
    // await console.log('asset count:',_assetCount);

    const assetFromBlockchain = await getAllAssets();
    await setAsset(assetFromBlockchain)
    // await console.log('asset from blockchain:',assetFromBlockchain);
  }
  return(
    <div className='dashboard'>
       <Sidebar page={'dashboard'}/>
      <div className='dashboard-container'> 
        <Navbar/>
        <div className='widgets'>
          <Widgets/>
          <Widgets/>
          <Widgets/>
          <Widgets/>
        </div>
        <div className='list-container'>
          <div className='list-title'> 
          {/* Latest Transactions */}
            <div className='search'>
              <input type='text' placeholder= 'Search...'></input>
              <SearchIcon className='icon'/> 
            </div>
            <Link to= '/createAsset'> <Button classVar='dark' text={'Create Asset'}/> </Link> 
            {isWeb3Enabled && 
            <>
            {/* <Button classVar='dark' text={'asset'} onClick={(e)=> {asset.map((item)=>{console.log(item)})}}/> 
            <Button classVar='dark' text={'count'} onClick={(e)=> {asset.map((item)=>{console.log(assetCount)})}}/>  */}
            </>

            }

        
          </div>  
          {asset.length >0 ? 
          <Table assets={asset} />
          :
          <>Loading assets...</>

          // <>
          // {asset.map((item)=>{
          //   return (
          //     <>
          //       <h3>Asset {item.id.toNumber()} is a {item.assetName} </h3>
          //       <p>Quantity : {item.quantity.toNumber()}</p>
          //       <p>{item.complete}</p>
          //     </>
           
          //   )
          // })}
          // </>
          // :
          // <>
          // Loading assets...
          // </>

          }
        </div>
      </div>
    </div>

  )
}

export default Dashboard

