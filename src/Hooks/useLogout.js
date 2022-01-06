import { useState,useEffect } from "react"
import { useAuth } from "./useAuth"
import { ProjectAuth } from "../Firebase/config"
import { useNavigate } from "react-router-dom"

export default function useLogout() {
    const [error,setError]=useState(null)
    const [isPending,setIsPending]=useState(null)
    const [isCancelled,setIsCancelled]=useState(false)
    //
    const {dispatchFunction}=useAuth()
    const navigate=useNavigate()
    async function logoutFn(){
        setError(null)
        setIsPending(true)

        try{
            await ProjectAuth.signOut()
            dispatchFunction({type:"LOGOUT"})
            if(!isCancelled){
                setError(null)
                setIsPending(false)
            }
        }catch(failed){
            if(!isCancelled){
                setError(failed.message)
                setIsPending(false)
            }
        }
    }
    useEffect(() => {
        return ()=>setIsCancelled(true)
    },[])
    return {error,isPending,logoutFn}
}
