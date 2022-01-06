import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../Hooks/useAuth"
import useLogout from "../Hooks/useLogout"
import './Navbar.css'

export default function Navbar() {
    const {user}=useAuth()
    const {logoutFn}=useLogout()
    const navigate=useNavigate()
    function userLogout(){
        logoutFn()
        navigate('/login')
    }
    return (
        <nav className="navlist">
            <Link to='/' className="logo">Expense Tracker</Link>
            <div>
                {user?<>
                        <p>Hello, {user.displayName.toUpperCase()}!</p>
                        <button className="btn logout-btn" onClick={userLogout}>Logout</button>
                    </>:
                    <>
                        <Link to='/login'>Login</Link>
                        <Link to='/signup'>Sign Up</Link>
                    </>}
            </div>
        </nav>
    )
}
