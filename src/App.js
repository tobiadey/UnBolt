// import logo from './logo.svg';
// import './App.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Dashboard from './pages/Dashboard';
import CreateAsset from './pages/CreateAsset';
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
