import { useEffect,useState } from 'react'
import {Link} from 'react-router-dom'
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import Table from '../components/Table'
import Button from '../components/Button'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import AssetDisplay from '../components/AssetDisplay'
import SearchIcon from '@mui/icons-material/Search';
import './Dashboard.css';
import logo from '../logo.svg';
import bag from '../images/bag.png';
import { ProductionQuantityLimits } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import contractAddress from '../constants/contractAddress';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Settings from './Settings';
import unbolt from '../truffle/build/contracts/UnBolt.json'

// import assets from '../truffle/build/contracts/Assets.json'



const Dashboard = () => {
 // The useMoralis hook provides all the basics functionalities that is needed for authentication and user data.
  const { authenticate, isAuthenticated, logout, user, enableWeb3,isWeb3Enabled,Moralis } = useMoralis();

  // useState gives a local state in a function component
  // the first paramter is the value and the second is the setter
  const [assetCount, setAssetCount] = useState(0)
  const [assets, setAssets] = useState([]);
  // state hooks to know which body to use for the dashbaord
  const [body, setBody] = useState('');
  //allow the sidebar.js componenet to call the handleSetBody() function which passes the current body to use
  const handleSetBody = (value) => {setBody(value)};
  const [search, setSearch] = useState('');

;

    // allows for performing side effects in the component
    // side effect in this case being calling the loadPage() function
    // use effect runs after every render
    // if the value of the second argunment changes(isAuthenticated, isWeb3Enabled, asset), useEffect is rerun
    useEffect(() => {
      const loadPage = async () => {
        //get the connectorID using the console window 
        const connectorId = window.localStorage.getItem("connectorId");
        try {
          //check if autenticated and web3 is not enabled in order
          if (isAuthenticated && !isWeb3Enabled){
            //enable web3 and store in a varible
            const web3Provider = await enableWeb3({ provider: connectorId });
          }
          //checking if the asset has already been loaded with the data, if (length==0) then no data has been loaded
          if(assets.length == 0){
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
    //callback functions, array of variables that the component will check to make sure changed before re-rendering. 
    [isAuthenticated, isWeb3Enabled, assets]);


    async function getAllAssets(){
    //defining the parameters for the execute function call, which executes a function in the smart contract
    const options = {
      abi: unbolt.abi,
      contractAddress: contractAddress.unboltContractAddress,
      functionName: 'getAssets',
    //empty parameter because this getter is generated automatically by solidity on creation of a mapping
    }
    //calls the smart contract function while returning the data in variable message
    const message = await Moralis.executeFunction(options)
    return message
    }

    //convrt all the bigNumbers type in the asset to number
    async function convertToNumber(array){
      const tempArray = []
      // console.log(array);
      try {
        for (let index = 0; index <= array.length-1; index++) {
          const data = array[index]
          if(data.id != undefined){
            tempArray[index] = { id: data.id.toNumber(), assetName: data.assetName,quantity: data.quantity.toNumber() ,completed: data.completed, creator: data.creator  }
          }
        }
      } catch (error) {
        console.log(error);
      }
      return tempArray
    }


  //load data and store them in state in state hooks 
  //in order to access them and pass them as props to other pages/components
  async function loadData() {
    const assetFromBlockchain = await getAllAssets();
    const _assets = await convertToNumber(assetFromBlockchain);
    setAssets(_assets)
  }



  return(
  <>
    {/* main/dashboard section */}
    {body == 'dashboard' | body == '' ?
    // {body == 'dashboard'  ?
      <div className='dashboard'>
        {/* onClick= {(e)=> {setBody('search')}} */}
        <Sidebar page={'dashboard'}handleSetBody= {handleSetBody}/>
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
                {/* <input type='text' placeholder= 'Search...'></input> */}
                {/* <SearchIcon className='icon'/>  */}
                UNBOLT
                  <Button classVar='dark' text={'Refresh Table'} onClick={(e)=>{test2()}}/>
              </div>
              <Link to= '/createAsset'> <Button classVar='dark' text={'Create Asset'}/> </Link> 
              {isWeb3Enabled && 
              <>
              {/* <Button classVar='dark' text={'asset'} onClick={(e)=> {asset.map((item)=>{console.log(item)})}}/> 
              <Button classVar='dark' text={'count'} onClick={(e)=> {asset.map((item)=>{console.log(assetCount)})}}/>  */}
              </>
              }
            </div>  
            {assets.length >0 ? 

            <div className='table-container'>
            <Table assets={assets} />
            </div>

            :

            <div>
              Loading assets...
              {/* <CircularProgress color="inherit" /> */}
            </div>
           
            }
          </div>
        </div>
      </div>
       :
       <>
       </>
    }

    {/* search section */}
    {body== 'search' ?
        <div className='search'>
          {/* onClick= {(e)=> {setBody('search')}} */}
          <Sidebar page={'search'}handleSetBody= {handleSetBody}/>
          <div className='search-container'> 
            <Navbar/>
            <div className='list-container-search'>
              <div className='list-title-search'> 
                {/* Latest Transactions */}
                <div className='search'>
                <input onChange={(e) => {setSearch(e.target.value)}} type='text_search' placeholder= 'Search...'></input>
                <SearchIcon className='icon'/> 
                </div>
              </div>  
            </div>
            <div className='mapping-container'>
              <div className='header-search'>
                <small>Trending Assets</small>
                <small>See all</small>
              </div>
              <div className='search-results'>
              {/* https://www.youtube.com/watch?v=-QsdzCs2hCU
              This video was used to understand how to implement searching a list, the code is exactly the same
              but it is alterted to fit my code by changing the list which is filtered through 
              and the return value of the mapping
               */}
                {assets.filter(item => {
                  if (search == '') {
                    return item
                  } else if(item.assetName.toLowerCase().includes(search.toLowerCase())) {
                    return item
                  }

                }).
                map((item)=>{
                  return(
              // key value is item.id as each child in a list should have a unique "key" prop
              <div className='widgets2' key={item.id}>
                 <AssetDisplay id={item.id} assetName={item.assetName} username={'username'} onClick={(e)=>{console.log(item.assetName)}} /> 
              </div>
                )})}

              </div>

            </div>
            <div className='load-more'>
              <Button text={'Load More'}/>
      
            </div>
          </div>
        </div>
      :
        <>
        </>

    }
    {/* benefitiary section */}
    {body== 'setting' ?
            <div className='setting'>
              <Sidebar page={'setting'}handleSetBody= {handleSetBody}/>
              <div className='setting-container'> 
                <Navbar/>
                <div className='list-container'>
                  <div className='list-title'> 
                    {/* Latest Transactions */}
                    {/* <div className='search'>
                    <input type='text' placeholder= 'Search...'></input>
                    <SearchIcon className='icon'/> 
                    </div> */}
                  </div>  
                </div>
                <div className='user-container'>
                   <Settings/>
                </div>
              </div>
            </div>
          :
            <>
            </>

        }



  </>


  )
}

export default Dashboard

