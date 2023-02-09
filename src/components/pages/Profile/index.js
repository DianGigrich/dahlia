import React,{useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import BucketList from '../../components/BucketList'
import API from "../../utils/API"

export default function Profile(props) {
    const navigate = useNavigate();
    useEffect(()=>{
        const storedToken = localStorage.getItem("token")
        if(storedToken){
          console.log(storedToken)
          API.getUserFromToken(storedToken).then(data=>{
            if(data.user){
              console.log(data)
              props.setToken(storedToken)
              props.setIsLoggedIn(true)
              props.setUserId(data.user.id)
              props.setUserEmail(data.user.email)
            } else {
                navigate("/login")
            }
          })
        } else {
          console.log('no stored token')
          navigate("/login")
        }
      },[])
  return (
    <>
    {
        props.isLoggedIn?(
        <div className="Profile">
        <h1>Welcome {props.userEmail}!</h1>
        <BucketList userId={props.userId} token={props.token}/>
        </div>
        ):(
            <h1>Loading....</h1>
        )
    }
    </>
  )
}
