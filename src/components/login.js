import React, {useState} from 'react'
import axios from 'axios'

function Login(props){

    const [username, setUsername]= useState("")
    const [password, setPassword]= useState("")

    const handleLogInButton = async () => {

        if (username===""||password==="") {
            alert("Fields are incomplete!")
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