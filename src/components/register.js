import React from 'react'

function Register(props){

  return(
      <div>
          <div className="form-holder">
              <div style={{display:"flex", alignItems:"center"}}>
                <input type="text" className="input" placeholder="Username" onChange={props.handleRegisterUsernameInputChange}/>
                <span style={{color:"red"}}>{props.registerUsernameError?"*":""}</span>
              </div>
              <div style={{display:"flex", alignItems:"center"}}>
                <input type="password" className="input" placeholder="Password" onChange={props.handleRegisterPasswordInputChange}/>
                <span style={{color:"red"}}>{props.registerPasswordError?"*":""}</span>
              </div>
              <div style={{display:"flex", alignItems:"center"}}>
                <input type="password" className="input" placeholder="Confirm Password" onChange={props.handleRegisterConfirmPasswordInputChange}/>
                <span style={{color:"red"}}>{props.registerConfirmPasswordError?"*":""}</span>
              </div>
          </div>
          <button className="submit-btn" onClick={props.handleRegisterButton}>Sign up</button>
      </div>
  )
}

export default Register;