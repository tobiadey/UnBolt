// import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import Dashboard from './components/Dashboard';
import CreateAsset from './components/CreateAsset';
import { BrowserRouter as Router, Route,Routes  } from 'react-router-dom'


function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path= '/' element = {<HomePage/>}/>
          <Route path= '/about' element={<AboutPage />} />
          <Route path= '/dashboard' element={<Dashboard />} />
          <Route path= '/createAsset' element={<CreateAsset />} />
        </Routes>
      </>
    </Router>
  );
}


export default App;
