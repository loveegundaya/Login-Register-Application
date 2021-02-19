import React from 'react'

function Login(props){
    
    return(
        <div>
            <div className="form-holder">

                <div style={{display:"flex", alignItems:"center"}}>
                    <input type="text" className="input" placeholder="Username" onChange={props.handleLoginUsernameInputChange} />
                    <span style={{color:"red"}}>{props.loginUsernameError?"*":""}</span>
                </div>
                <div style={{display:"flex", alignItems:"center"}}>
                    <input type="password" className="input" placeholder="Password" onChange={props.handleLoginPasswordInputChange}/>
                    <span style={{color:"red"}}>{props.loginPasswordError?"*":""}</span>
                </div>
            </div>
            <button className="submit-btn" onClick={props.handleLogInButton}>Log in</button>
        </div>
    )
}

export default Login;