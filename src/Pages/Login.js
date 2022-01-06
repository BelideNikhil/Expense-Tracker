import { useState } from "react"
import useLogin from "../Hooks/useLogin"

export default function Login() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    //
    const {error,isPending,loginFn}=useLogin()
    //
    function submitHandler(e){
        console.log(error)
        e.preventDefault()
        loginFn(email,password)
    }
    return (
        <div className="form-data">
            <h3>Login to check your Transactions!</h3>
            {error && <p className="msg error-msg">{error}</p>}
            <form onSubmit={submitHandler} className="form">
                <label>
                    Email: <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </label>
                <label>
                    Password: <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete="off"/>
                </label>
                <button type="submit" className="btn" disabled={isPending}>Login!</button>
            </form>
        </div>
    )
}
