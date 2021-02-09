import React, {useState} from 'react'
import axios from 'axios'

function Register(props){
  const [username, setUsername]= useState("")
  const [password, setPassword]= useState("")
  const [confirm_password, setConfirmPassword]= useState("")
  const [usernameError, setUsernameError]= useState(false)
  const [passwordError, setPasswordError]= useState(false)
  const [confirm_passwordError, setConfirmPasswordError]= useState(false)

  const handleRegisterButton = async () => {

    if ((confirm_password!==password)&&(confirm_password!==""&&password!=="")){
      alert("Passwords mismatched")
      return
    }
    if (username===""){
      setUsernameError(true)
      return
    }
    if (password===""){
      setPasswordError(true)
      return
    }
    if (confirm_password===""){
      setConfirmPasswordError(true)
      return
    }

    const detail = {
      username,
      password,
      confirm_password
    }

    try {
      const response = await axios.post('/register',detail)

      if (response.data.success){
        alert(response.data.message)
        localStorage.setItem("username", username)
        localStorage.setItem("component", "dashboard")
        props.changeUser(username)
        props.changeComponent("dashboard");
      }
      else {
        alert(response.data.message)
      }
    } catch (e){
      alert("Error occured")
    }
  }
  const handleUsernameInputChange = (e) => {
      setUsername(e.target.value)
      if (e.target.value!==""){
          setUsernameError(false)
      }
  }

  const handlePasswordInputChange = (e) => {
      setPassword(e.target.value)
      if (e.target.value!==""){
          setPasswordError(false)
      }
  }

  const handleConfirmPasswordInputChange = (e) => {
      setConfirmPassword(e.target.value)
      if (e.target.value!==""){
          setConfirmPasswordError(false)
      }
  }

  return(
      <div>
          <div className="form-holder">
              <div style={{display:"flex", alignItems:"center"}}>
                <input type="text" className="input" placeholder="Username" onChange={handleUsernameInputChange}/>
                <span style={{color:"red"}}>{usernameError?"*":""}</span>
              </div>
              <div style={{display:"flex", alignItems:"center"}}>
                <input type="password" className="input" placeholder="Password" onChange={handlePasswordInputChange}/>
                <span style={{color:"red"}}>{passwordError?"*":""}</span>
              </div>
              <div style={{display:"flex", alignItems:"center"}}>
                <input type="password" className="input" placeholder="Confirm Password" onChange={handleConfirmPasswordInputChange}/>
                <span style={{color:"red"}}>{confirm_passwordError?"*":""}</span>
              </div>
          </div>
          <button className="submit-btn" onClick={handleRegisterButton}>Sign up</button>
      </div>
      
  )
}

export default Register;