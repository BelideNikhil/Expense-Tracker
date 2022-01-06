import { useAuth } from "../Hooks/useAuth"
import { Navigate } from "react-router-dom"
import { Outlet } from "react-router-dom"


export default function PrivateRoute(){
    const {user}=useAuth()
    return user?<Outlet/>:<Navigate to="/login "/>
}
