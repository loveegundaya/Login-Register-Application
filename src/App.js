import './App.css';
import Dashboard from './components/dashboard'
import Login from './components/login'
import Register from './components/register'
import {useState} from 'react'

function App() {

    const [component, setComponent] = useState(localStorage.getItem("component")?localStorage.getItem("component"):"login")
    const [user, setUser] = useState(localStorage.getItem("username")?localStorage.getItem("username"):"")
    const [userID, setUserID] = useState(localStorage.getItem("userID")?localStorage.getItem("userID"):"")

    const handleLogInText =  () => {
      localStorage.setItem("component", "login")
      setComponent("login")
    }

    const handleSignUpText =  () => {
      localStorage.setItem("component", "login")
      setComponent("register")
    }

    return(
      <div>
        {component === "dashboard" ?
          <Dashboard      
          user={user}
          userID={userID}
          changeComponent={setComponent}
          />
          :
          <div className="form-structor" id="form-structor">
            <div className={component==="register"? 'signup':'signup slide-up'}>
                <h2 className="form-title" id="signup" onClick={handleSignUpText}><span>or</span>Sign up</h2>
                <Register
                  changeComponent={setComponent}
                  userID={userID}
                  changeUserID={setUserID}
                  changeUser={setUser}
                />
            </div>
            <div className={component==="login"? 'login':'login slide-up'}>
                <div className="center">
                    <h2 className="form-title" id="login" onClick={handleLogInText}><span>or</span>Log in</h2>
                    <Login
                      changeComponent={setComponent}
                      userID={userID}
                      changeUserID={setUserID}
                      changeUser={setUser}
                    />
                </div>
            </div>
          </div>
        }  
      </div>
    )
}

export default App;