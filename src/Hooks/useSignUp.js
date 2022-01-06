import { useState ,useEffect} from "react"
import { ProjectAuth } from "../Firebase/config"
import { useAuth } from "./useAuth"

export default function useSignUp() {
    const [error,setError]=useState(null)
    const [isPending,setIsPending]=useState(null)
    const [isCancelled,setIsCancelled]=useState(false)
    //
    const {dispatchFunction}=useAuth()
    const signupFn=async(email,password,userName)=>{
        try{
            setError(null)
            setIsPending(true)
            const response=await ProjectAuth.createUserWithEmailAndPassword(email,password)
            if(!response){
                throw new Error("Error Occured!")
            }
            await response.user.updateProfile({displayName:userName})
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
    //cleanup function
    useEffect(()=>{
        return (()=>setIsCancelled(true))
    })
    return ({error,isPending,signupFn})
}
