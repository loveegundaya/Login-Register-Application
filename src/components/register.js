import React, {useState} from 'react'
import axios from 'axios'

function Register(props){
  const [username, setUsername]= useState("")
  const [password, setPassword]= useState("")
  const [confirm_password, setConfirmPassword]= useState("")

  const handleRegisterButton = async () => {

    if ((confirm_password!==password)&&(confirm_password!==""&&password!=="")){
      alert("Passwords mismatched")
      return
    }
    else if (username===""||password===""||confirm_password===""){
      alert("Fields are incomplete")
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
        props.changeUser(username)
        props.changeComponent("dashboard");
      }
      else {
        alert(response.data.message)
      }
    } catch (e){
      alert("Error occured")
    }

    // axios.post('/register',detail)
    // .then((e)=>{
    //   if (e.data.success){
    //     alert(e.data.message)
    //     props.changeUser(username)
    //     props.changeComponent("dashboard");
    //   }
    //   else {
    //     alert(e.data.message)
    //   }
    // })
    // .catch(e=>{
    //     alert(e.data.message)
    // })

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
              <input type="text" class="input" placeholder="Username" onChange={handleUsernameInputChange}/>
              <input type="password" class="input" placeholder="Password" onChange={handlePasswordInputChange}/>
              <input type="password" class="input" placeholder="Confirm Password" onChange={handleConfirmPasswordInputChange}/>
          </div>
          <button class="submit-btn" onClick={handleRegisterButton}>Sign up</button>
      </div>
      
  )
}

export default Register;