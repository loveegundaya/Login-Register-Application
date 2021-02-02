import React, {useState} from 'react'
import axios from 'axios'
import '../App.css'


function Register(props){
  const [username, setUsername]= useState("")
  const [password, setPassword]= useState("")
  const [confirm_password, setConfirmPassword]= useState("")

  const handleRegisterButton =  () => {

    if (username!==""&&password!==""&&confirm_password===password){
      const detail = {
        username,
        password,
        confirm_password
      }

      let message = ""

      axios.post('/register',detail).then((response)=>{
        message = response.data.message
        if (message === 'Registered Succesfully'){
          alert(response.data.message)
          props.changeUser(username)
          props.changeComponent("dashboard");
        }
        else if (message === 'Username already exists'){
          alert(response.data.message)
        }
      })
    }
    else if (confirm_password!==password&&confirm_password!==""&&password!==""){
      alert("Passwords mismatched")
    }
    else if (username===""||password===""||confirm_password===""){
      alert("Fields are incomplete")
    }

  }

  const handleUsernameInputChange = (e) => {
      setUsername(e.target.value)
  }

  const handlePasswordInputChange = (e) => {
      setPassword(e.target.value)
  }

  const handleConfirmPasswordInputChange = (e) => {
      setConfirmPassword(e.target.value)
  }

  return(
      <div>
          <div class="form-holder">
              <input type="text" class="input" placeholder="Name" onChange={handleUsernameInputChange}/>
              <input type="password" class="input" placeholder="Password" onChange={handlePasswordInputChange}/>
              <input type="password" class="input" placeholder="Confirm Password" onChange={handleConfirmPasswordInputChange}/>
          </div>
          <button class="submit-btn" onClick={handleRegisterButton}>Sign up</button>
      </div>
      
  )
}

export default Register;