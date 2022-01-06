import React,{ useReducer,useEffect,useState } from "react"
import {ProjectAuth} from '../Firebase/config'

export const Context=React.createContext()

const reducer=(state,action)=>{
    if(action.type==="LOGIN"){
        return {...state,user:action.payload}
    }
    else if(action.type==="AUTH_CHANGE"){
        return {user:action.payload,authIsReady:true}
    }else if(action.type==="LOGOUT"){
        return {...state,user:null}
    }
    else{
        return state
    }
}

export const AuthProvider=({children})=>{
    const [state,dispatchFunction]=useReducer(reducer,{user:null,authIsReady:false})
    // console.log("AUTH:STATE",state)

    //if user is logged then fetch firebase auth and set the user as logged in user once
    useEffect(() => {
        const unsub=ProjectAuth.onAuthStateChanged(user=>{
            dispatchFunction({type:"AUTH_CHANGE",payload:user})
            unsub()
        })
    }, [])
    
    return (
        <Context.Provider value={{...state,dispatchFunction}}>
            {children}
        </Context.Provider>
    )
}
