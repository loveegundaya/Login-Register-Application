import React, {useState} from 'react'
import axios from 'axios'
import '../App.css';

function Login(props){

    const [username, setUsername]= useState("")
    const [password, setPassword]= useState("")

    const handleLogInButton =  () => {
        
        if(username!==""&&password!==""){
            const detail = {
                username,
                password
            }
            let message = ""
            axios.post('/login',detail).then((response)=>{
                message = response.data.message
                if (message === 'Logged in successfully'){
                    alert(response.data.message)
                    props.changeUser(username)
                    props.changeComponent("dashboard");
                }
                else if (message === 'Credentials not found!'){
                    alert(response.data.message)
                }
            })
        }
        else {
            alert("Fields are incomplete!")
        }


    }
  
    const handleUsernameInputChange = (e) => setUsername(e.target.value)
    const handlePasswordInputChange= (e) => setPassword(e.target.value)

    return(
        <div>
            <div class="form-holder">
            <input type="text" class="input" placeholder="Username" onChange={handleUsernameInputChange}/>
                <input type="password" class="input" placeholder="Password" onChange={handlePasswordInputChange}/>
            </div>
            <button class="submit-btn" onClick={handleLogInButton}>Log in</button>
        </div>
    )
}

export default Login;