import './AssetDisplay.css';
import bag from '../images/bag.png';
import {Link} from 'react-router-dom'


// components for displaying assets
//takes in props which it uses to differentiate from other AssetDisplay components
const AssetDisplay = ({id,assetName,username,onClick}) => {

    return(
        <Link className='link' to={`/asset/${id}`}>  
        <div className='asset-display' onClick = {onClick}>
            <img className='image' src={bag} alt="Logo" />

            <div className='bottom'>
                <p className='asset-name'>{assetName}</p>
                <p className='user-name'>{username}</p>
            </div>          
        </div>
        </Link>
    )
  
  }
  
  
  export default AssetDisplay

           