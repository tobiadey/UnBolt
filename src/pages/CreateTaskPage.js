import './CreateTaskPage.css';
import Button from '../components/Button'
import { useParams, Navigate, useNavigate, useLocation} from 'react-router-dom'


const CreateTaskPage = () => {
    const navigate = useNavigate()
    const params = useParams()


    return(
        <div className='create-task-page'>
             <Button classVar='dark' text={'Back'} onClick= {() => {navigate(-1)}}/> 
             <div className='right'> asset id of {params.id}</div>
        </div>
    )
  
  }
  
  
  export default CreateTaskPage