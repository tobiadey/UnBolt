import './AssetDisplay.css';
import bag from '../images/bag.png';
import {Link} from 'react-router-dom'


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



        // <div className='items-container'>
        // <div className='item'>
        //     <img src={bag} alt="Logo" />
        //     <div className='label'>
        //     <p className='name'>{item.assetName}</p>
        //     <small className='name'> Username </small>
        //     </div>

        // </div>
        // </div>
    )
  
  }
  
  
  export default AssetDisplay

           