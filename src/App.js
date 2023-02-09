import {useEffect, useState} from "react";
import DahliaList from "./components/DahliaList";
import API from "./utils/API";
import Home from "./pages/Home"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Profile from "./pages/Profile";
import Navbar from "./components/NavBar";
import Login from "./pages/Login";

function App() {
  const [userId, setUserId] = useState(0)
  const [userEmail, setUserEmail] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState("")

  useEffect(()=>{
    const storedToken = localStorage.getItem("token")
    if(storedToken){
      console.log(storedToken)
      API.getUserFromToken(storedToken).then(data=>{
        if(data.user){
          console.log(data)
          setToken(storedToken)
          setIsLoggedIn(true)
          setUserId(data.user.id)
          setUserEmail(data.user.email)
        }
      })
    } else {
      console.log('no stored token')
    }
  },[])

  const handleLoginSubmit = userObj=>{
    API.login(userObj).then(data=>{
      console.log(data);
      if(data.token){
        setUserId(data.user.id)
        setToken(data.token)
        setIsLoggedIn(true)
        setUserEmail(data.user.email)
        localStorage.setItem("token",data.token)
      }
    })
  }
  const handleSignupSubmit = userObj=>{
    API.signup(userObj).then(data=>{
      console.log(data);
      if(data.token){
        setUserId(data.user.id)
        setToken(data.token)
        setIsLoggedIn(true)
        setUserEmail(data.user.email)
        localStorage.setItem("token",data.token)
      }
    })
  }
  const handleLogout = ()=>{
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserId(0);
    setToken("");
    setUserEmail("")
  }
  return (
    <div className="App">
      <Router>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login
            isLoggedIn={isLoggedIn}
            handleLoginSubmit={handleLoginSubmit}
            handleSignupSubmit={handleSignupSubmit}
          />}/>
          <Route path="/profile" element={<Profile 
          isLoggedIn={isLoggedIn} 
          userId={userId} 
          token={token} 
          userEmail={userEmail}
          setIsLoggedIn={setIsLoggedIn}
          setToken={setToken}
          setUserId={setUserId}
          setUserEmail={setUserEmail}
          />}/>
          
          <Route path="*" element={<h1>404 page</h1>}/>
        </Routes>
        <h2>Footer</h2>
      </Router>
      </div>
  );
}

export default App;
