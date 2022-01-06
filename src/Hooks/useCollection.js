import { useState,useEffect,useRef } from 'react'
import {ProjectFirebase} from '../Firebase/config'


export default function useCollection(collection,_query,_orderBy) {
    const [error,setError]=useState(null)
    const [documents,setDocuments]=useState('')
    //storing array in useRef as it's a dependency and array's are of refenrence type and case inf loops
    const query=useRef(_query).current
    const orderBy=useRef(_orderBy).current
    //
    useEffect(()=>{
        setError(null)
        let ref=ProjectFirebase.collection(collection)
        if(query){
            ref=ref.where(...query)
        }
        if(orderBy){
            ref=ref.orderBy(...orderBy)
        }
        const cleaner=ref.onSnapshot((snapshot=>{
            let data=[]
            snapshot.docs.forEach(doc=>{
                data.push({...doc.data(),id:doc.id})
            })
            setDocuments(data)
        }),failure=>{
            console.log(failure)
            setError(failure.message)
        })
        return (()=>cleaner())
    },[collection, query,orderBy])
    
    return {documents,error}
}
