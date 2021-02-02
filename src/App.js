import './App.css';
import Dashboard from './components/dashboard'
import Login from './components/login'
import Register from './components/register'
import {useState} from 'react'

function App() {

  const [component, setComponent] = useState("login")
    const [user, setUser] = useState(null)

    const handleLogInText =  () => {
        setComponent("login")
    }

    const handleSignUpText =  () => {
        setComponent("register")
    }

    return(
      <div>
        {component === "dashboard" ?
          <Dashboard        
          user={user}
          />
          :
          <div class="form-structor" id="form-structor">
            <div class={component==="register"? 'signup':'signup slide-up'}>
                <h2 class="form-title" id="signup" onClick={handleSignUpText}><span>or</span>Sign up</h2>
                <Register
                  changeComponent={setComponent}
                  changeUser={setUser}
                />
            </div>
            <div class={component==="login"? 'login':'login slide-up'}>
                <div class="center">
                    <h2 class="form-title" id="login" onClick={handleLogInText}><span>or</span>Log in</h2>
                    <Login
                      changeComponent={setComponent}
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