
import './Button.css';

// components for buttons
//takes in props which it uses to differentiate from other button components
const Button = ({classVar,bgColor,color, text, onClick}) => {


    return(
  
      <div className='btn-cointainer'>
        <button 
          onClick = {onClick} 
          style ={{backgroundColor: bgColor, color: color}} 
          className={`btn ${ classVar }`}>
            {text}
        </button>
      </div>

    )
 
  
  }
  
  Button.defaultProps = {
    // color: 'steelBlue',
  }
  
  export default Button