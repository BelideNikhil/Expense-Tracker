import { useState } from "react"
import useSignUp from "../Hooks/useSignUp"

export default function SignUp() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [userName,setUsername]=useState('')
    //
    const {error,isPending,signupFn}=useSignUp()
    //
    function submitHandler(e){
        console.log(error)
        e.preventDefault()
        signupFn(email,password,userName)
    }
    return (
        <div className="form-data">
            <h3>Create an Account!</h3>
            {error && <p className="msg error-msg">{error}</p>}
            <form onSubmit={submitHandler} className="form">
                <label>
                    Email: <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </label>
                <label>
                    Password: <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete="off"/>
                </label>
                <label>
                    User Name: <input type="text" required value={userName} onChange={(e)=>setUsername(e.target.value)}/>
                </label>
                <button type="submit" className="btn" disabled={isPending}>{isPending?"Loading":"Sign Up!"}</button>
            </form>
        </div>
    )
}
