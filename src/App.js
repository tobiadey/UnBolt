import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Dashboard from './pages/Dashboard';
import CreateAssetPage from './pages/CreateAssetPage';
import { BrowserRouter as Router, Route,Routes  } from 'react-router-dom'


function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path= '/' element = {<HomePage/>}/>
          <Route path= '/about' element={<AboutPage />} />
          <Route path= '/dashboard' element={<Dashboard />} />
          <Route path= '/createAsset' element={<CreateAssetPage />} />
        </Routes>
      </>
    </Router>
  );
}


export default App;
