import {Route,BrowserRouter,Routes} from 'react-router-dom'
import { Navigate } from 'react-router-dom';
//
import Navbar from './Components/Navbar';
import Login from './Pages/Login'
import Logout from './Pages/Logout'
import SignUp from './Pages/SignUp'
import Dashboard from './Pages/Dashboard'
//
import PrivateRoute from './Components/PrivateRoute';
//
import { useAuth } from './Hooks/useAuth';
export default function App() {
  const {user,authIsReady}=useAuth()
  return (
    <div className="App">
      {authIsReady&&
      <>
        <BrowserRouter>
        <Navbar/>
        <div className='container'>
          <Routes>
            <Route path='/' element={user?<Dashboard/>:<Navigate to="/login" />}/>
            <Route path="/signup"  element={user?<Navigate to="/" />:<SignUp/>}></Route>
            <Route path="/login" element={user?<Navigate to="/" />:<Login/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
      </>}
    </div>
  );
}
