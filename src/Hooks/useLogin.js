import { useState,useEffect } from "react"
import { useAuth } from "./useAuth"
import { ProjectAuth } from "../Firebase/config"

export default function useLogin() {
    const [error,setError]=useState(null)
    const [isPending,setIsPending]=useState(null)
    const [isCancelled,setIsCancelled]=useState(false)
    //
    const {dispatchFunction}=useAuth()
    async function loginFn (email,password){
        try{
            setError(null)
            setIsPending(true)
            const response=await ProjectAuth.signInWithEmailAndPassword(email,password)
            if(!response){
                throw new Error("Could not Login.")
            }
            dispatchFunction({type:"LOGIN",payload:response.user})
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
    return {error,isPending,loginFn}
}
