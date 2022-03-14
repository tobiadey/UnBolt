
import './Button.css';


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