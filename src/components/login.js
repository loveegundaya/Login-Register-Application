import React, {useState} from 'react'
import axios from 'axios'

function Login(props){

    const [username, setUsername]= useState("")
    const [password, setPassword]= useState("")
    const [usernameError, setUsernameError]= useState(false)
    const [passwordError, setPasswordError]= useState(false)

    const handleLogInButton = async () => {

        if (username==="") {
            setUsernameError(true)
            return
        }
        if (password==="") {
            setPasswordError(true)
            return
        }

        const detail = {
            username,
            password
        }

        try {
            const response = await axios.post('/login',detail)
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
        } catch (e) {
            alert('Error occured');
        }

        // axios.post('/login',detail)
        //     .then((e)=>{
        //         if (e.data.success){
        //             alert(e.data.message)
        //             props.changeUser(username)
        //             props.changeComponent("dashboard");
        //         }
        //         else {
        //             alert(e.data.message)
        //         }
        //     })
        //     .catch(e=>{
        //         alert(e.data.message)
        //     })

    }
  
    const handleUsernameInputChange = (e) => {
        setUsername(e.target.value)
        if (e.target.value!==""){
            setUsernameError(false)
        }
    }
    const handlePasswordInputChange= (e) => {
        setPassword(e.target.value)
        if (e.target.value!==""){
            setPasswordError(false)
        }
    }

    return(
        <div>
            <div class="form-holder">

                <div style={{display:"flex", alignItems:"center"}}>
                    <input type="text" class="input" placeholder="Username" onChange={handleUsernameInputChange} />
                    <span style={{color:"red"}}>{usernameError?"*":""}</span>
                </div>
                <div style={{display:"flex", alignItems:"center"}}>
                    <input type="password" class="input" placeholder="Password" onChange={handlePasswordInputChange}/>
                    <span style={{color:"red"}}>{passwordError?"*":""}</span>
                </div>
            </div>
            <button class="submit-btn" onClick={handleLogInButton}>Log in</button>
        </div>
    )
}

export default Login;