import React from 'react'
import {Link,useNavigate} from 'react-router-dom'

export default function Navbar(props) {
  const navigate = useNavigate()
  const logoutFunc = ()=>{
    props.handleLogout()
    navigate("/login")
  }
  return (
    <div>
        <Link to ="/">Home</Link>
        {props.isLoggedIn?<Link to ="/Profile">Profile</Link>:null}
        {props.isLoggedIn?<button onClick={logoutFunc}>Logout</button>:<Link to="/login">login</Link>}
    </div>
  )
}
