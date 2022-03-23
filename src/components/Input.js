import { textAlign } from '@mui/system';
import './Input.css';


const Input = ({title}) => {

// add props for text, placeholder,onclick,
    return(
        <div className='input'>
            <label className='input-title'>{title}</label>
            <div className='input-box'>
            <input type='text'/>
            </div>
        </div>
    )
  
  }
  
  
  export default Input
