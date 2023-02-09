import React, {useEffect,useState} from 'react'
import {useNavigate} from "react-router-dom"
export default function Login(props) {
  const navigate = useNavigate();
  useEffect(()=>{

        if(props.isLoggedIn){
            navigate("/profile")
        }
            
    },[props.isLoggedIn])
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [signupEmail, setSignupEmail] = useState("")
    const [signupPassword, setSignupPassword] = useState("")

    const loginHandle=e=>{
      e.preventDefault();
      props.handleLoginSubmit({
        email:loginEmail,
        password:loginPassword
      })
    }
    const signupHandle=e=>{
      e.preventDefault();
      props.handleSignupSubmit({
        email:loginEmail,
        password:loginPassword
      })
    }
  return (
    <div>
    <form onSubmit={loginHandle}>
      <h3>Login</h3>
      <input name="email"  value={loginEmail} onChange={e=>setLoginEmail(e.target.value)}/>
      <input type="password" name="password" value={loginPassword} onChange={e=>setLoginPassword(e.target.value)}/>
      <button>Log in!</button>
    </form>
    <form onSubmit={signupHandle}>
      <h3>Signup</h3>
      <input name="email"  value={signupEmail} onChange={e=>setSignupEmail(e.target.value)}/>
      <input type="password" name="password" value={signupPassword} onChange={e=>setSignupPassword(e.target.value)}/>
      <button>Signup!</button>
    </form>
    </div>
  )
}
