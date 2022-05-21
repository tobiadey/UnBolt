import './Widgets.css';

// components for showing the widgets
const Widgets = ({left,right}) => {


    return(
        <div className='widget'>
            <div className='left'>{left}</div>
            <div className='right'>{right}</div>
        </div>
    )
  
  }
  Widgets.defaultProps = {
    left: 'somethingLeft',
    right: 'somethingRight',
  }
  
  export default Widgets