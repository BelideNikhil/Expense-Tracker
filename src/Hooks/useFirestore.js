import { useState,useReducer,useEffect } from "react";
import {ProjectFirebase} from '../Firebase/config'
import { Timestamp } from "../Firebase/config";

const reducer =(state,action)=>{
    if(action.type==="PENDING"){
        return {isPending:true,document:null,error:null,success:false}
    }else if(action.type==="ADD_DOCUMENT"){
        return {isPending:false,document:action.payload,error:null,success:true}
    }else if(action.type==="DELETE_DOCUMENT"){
        return {isPending:false,document:null,error:null,success:true}
    }else if(action.type==="ERROR"){
        return {isPending:false,document:null,error:action.payload,success:false}
    }else{
        return {...state}
    }

}
const initialState={
    document:null,
    error:null,
    isPending:false,
    success:false
}
export function useFirestore(collection) {
    const [state,dispatch]=useReducer(reducer,initialState)
    const [isCancelled,setIsCancelled]=useState(false)
    const reference=ProjectFirebase.collection(collection)

    const dispatchIfNotCancelled=(action)=>{
        if(!isCancelled){
            dispatch(action)
        }
    }
    //
    const addDocFn=async(doc)=>{
        dispatch({type:"PENDING"})
        try{
            const createdAt=Timestamp.fromDate(new Date())
            const add_doc=await reference.add({...doc,createdAt:createdAt})
            dispatchIfNotCancelled({type:"ADD_DOCUMENT",payload:add_doc})
        }catch(failure){
            console.log(failure)
            dispatchIfNotCancelled({type:"ERROR",payload:failure.message})
        }
    }
    //
    const deleteDocFn=async(id)=>{
        dispatch({type:"PENDING"})
        try{
            await reference.doc(id).delete()
            dispatchIfNotCancelled({type:"DELETE_DOCUMENT"})
        }catch(failure){
            console.log(failure)
            dispatchIfNotCancelled({type:"ERROR",payload:failure.message})
        }
    }
    //
    useEffect(()=>{
        return (()=>setIsCancelled(true))
    },[])
    //
    return {...state,addDocFn,deleteDocFn};
}
