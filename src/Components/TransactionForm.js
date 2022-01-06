import { useState,useEffect } from "react"
import { useAuth } from "../Hooks/useAuth"
import {useFirestore} from "../Hooks/useFirestore"

export default function TransactionForm() {
    const [amount,setAmount]=useState('')
    const [message,setMessage]=useState('')
    const {addDocFn,success}=useFirestore('Transactions')
    const {user}=useAuth()

    function handleSubmit(e){
        e.preventDefault()
        addDocFn({amount,message,uid:user.uid})
    }
    useEffect(() => {
        if(success){
            setMessage('')
            setAmount('')
        }
    }, [success])
    return (
        <div className="trans-data">
            <h3>Add Transaction.</h3>
            <form onSubmit={handleSubmit}>
                <label>Transaction Name:<input type="text" required value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Udemy Course?"/></label>
                <label>Amount  <i className="fas fa-rupee-sign"></i><input type="number" required value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="385"/></label>
                <button type="submit" className="btn">Add</button>
            </form>
        </div>
    )
}
