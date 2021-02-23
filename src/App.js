import './App.css';
import Dashboard from './components/dashboard'
import Login from './components/login'
import Register from './components/register'
import { React, Component } from 'react'
import axios from 'axios'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      component: localStorage.getItem("component") ? localStorage.getItem("component") : "login",
      user: localStorage.getItem("username") ? localStorage.getItem("username") : "",
      userID: localStorage.getItem("userID") ? localStorage.getItem("userID") : "",
      loginUsername: "",
      loginPassword: "",
      loginUsernameError: false,
      loginPasswordError: false,
      registerUsername: "",
      registerPassword: "",
      registerConfirmPassword: "",
      registerUsernameError: false,
      registerPasswordError: false,
      registerConfirmPasswordError: false,
      task: "",
      taskID: "",
      taskUpdate: "",
      taskError: false,
      todoList: [],
      updateButtonText: "Update",
      updateID: "",
    }
  }

  fetchData = async () => {
    const { userID } = this.state
    try {
      const result = await axios.post('/get_tasks', { userID })
      if (result.data.success) {
        const todolist = result.data.payload
        this.setState({ ...this.state, todoList: todolist })
      }
      else {
        alert(result.data.message)
      }
    } catch (error) {
      alert("Error Occured")
    }

  }

  componentDidMount() {
    this.fetchData();
  }

  handleLogInText = () => {
    localStorage.setItem("component", "login")
    this.setState({ ...this.state, component: "login" })
  }

  handleSignUpText = () => {
    localStorage.setItem("component", "login")
    this.setState({ ...this.state, component: "register" })
  }

  handleLoginUsernameInputChange = (e) => {
    const { value } = e.target
    if (value !== "") {
      this.setState({ ...this.state, loginUsername: value, loginUsernameError: false })
    }
  }

  handleLoginPasswordInputChange = (e) => {
    const { value } = e.target
    if (value !== "") {
      this.setState({ ...this.state, loginPassword: value, loginPasswordError: false })
    }
  }

  handleLogInButton = async () => {

    const { loginUsername, loginPassword } = this.state

    if (loginUsername === "") {
      return this.setState({ ...this.state, loginUsernameError: true })
    }
    if (loginPassword === "") {
      return this.setState({ ...this.state, loginPasswordError: true })
    }

    const detail = { loginUsername, loginPassword }

    try {
      const response = await axios.post('/login', detail)
      const { success, payload } = response.data

      if (success) {
        localStorage.setItem("username", loginUsername)
        localStorage.setItem("component", "dashboard")
        localStorage.setItem("userID", payload)
        this.setState({ ...this.state, userID: payload, user: loginUsername, component: "dashboard" })
        this.fetchData()
      }
      else {
        alert(response.data.message)
      }
    } catch (e) {
      alert('Error occured');
    }
  }

  handleRegisterUsernameInputChange = (e) => {
    const { value } = e.target
    if (value !== "") {
      this.setState({ ...this.state, registerUsername: value, registerUsernameError: false })
    }
  }

  handleRegisterPasswordInputChange = (e) => {
    const { value } = e.target
    if (value !== "") {
      this.setState({ ...this.state, registerPassword: value, registerPasswordError: false })
    }
  }

  handleRegisterConfirmPasswordInputChange = (e) => {
    const { value } = e.target
    if (value !== "") {
      this.setState({ ...this.state, registerConfirmPassword: value, registerConfirmPasswordError: false })
    }
  }

  handleRegisterButton = async () => {

    const { registerUsername, registerPassword, registerConfirmPassword } = this.state
    const { registerUsernameError, registerPasswordError, registerConfirmPasswordError } = this.state

    if ((registerPassword !== registerConfirmPassword) && (registerPassword !== "" && registerConfirmPassword !== "")) {
      return alert("Passwords mismatched")
    }
    if (registerUsername === "") {
      return this.setState({ ...this.state, registerUsernameError: true })
    }
    if (registerPassword === "") {
      return this.setState({ ...this.state, registerPasswordError: true })
    }
    if (registerConfirmPassword === "") {
      return this.setState({ ...this.state, registerConfirmPasswordError: true })
    }

    const detail = {
      registerUsername,
      registerPassword,
      registerConfirmPassword
    }

    if (!registerUsernameError && !registerPasswordError && !registerConfirmPasswordError) {
      try {
        const response = await axios.post('/register', detail)
        if (response.data.success) {
          localStorage.setItem("username", registerUsername)
          localStorage.setItem("component", "dashboard")
          this.setState({ ...this.state, userID: response.data.payload, user: registerUsername, component: "dashboard" })
          this.fetchData()
        }
        else {
          alert(response.data.message)
        }
      } catch (e) {
        alert("Error occured")
      }
    }
  }

  handleDashboardLogOutButton = () => {
    localStorage.setItem("username", "")
    localStorage.setItem("component", "login")
    this.setState({ ...this.state, todoList: [], component: "login" })
  }

  handleDashboardTodoInputChange = (e) => {
    this.setState({ ...this.state, task: e.target.value })
  }

  handleDashboardAddTaskButton = async (event) => {
    const { task, user, userID } = this.state
    if (task === "") {
      return this.setState({ ...this.state, taskError: true })
    }
    const detail = {
      userID,
      user,
      task
    }
    try {
      const response = await axios.post('/add-task', detail)
      if (response.data.success) {
        this.setState({ ...this.state, task: "", taskID: response })
        this.fetchData();
      }
      else {
        alert(response.data.message)
      }
    } catch (e) {
      alert(e);
    }
  }

  handleDashboardUpdateTodoInputChange = (e) => {
    this.setState({ ...this.state, taskUpdate: e.target.value })
  }

  handleDashboardCancelButton = () => {
    this.setState({ ...this.state, updateID: "", updateButtonText: "Update" })
  }

  handleDashboardDeleteButton = async (e) => {

    const { id } = e.target
    const detail = { id }

    try {
      const response = await axios.post('/delete_task', detail)
      if (response.data.success) {
        this.fetchData()
      }
      else {
        alert(response.data.message)
      }
    } catch (e) {
      alert('Error occured');
    }

  }

  handleDashboardUpdateButton = async (e) => {

    const { id, name } = e.target
    const { updateButtonText, taskUpdate } = this.state

    if (updateButtonText === 'Update') {
      this.setState({ ...this.state, updateID: id, updateButtonText: "Save", taskUpdate: name })
    }
    else {
      const detail = { id, taskUpdate }
      try {
        const response = await axios.post('/update_task', detail)
        if (response.data.success) {
          this.fetchData()
        }
        else {
          alert(response.data.message)
        }
      } catch (e) {
        alert('Error occured');
      }
      this.setState({ ...this.state, updateID: "", updateButtonText: "Update" })
    }
  }

  render() {
    return (
      <div>
        {this.state.component === "dashboard" ?
          <Dashboard
            user={this.state.user}
            task={this.state.task}
            taskError={this.state.taskError}
            taskUpdate={this.state.taskUpdate}
            updateID={this.state.updateID}
            todoList={this.state.todoList}
            updateButtonText={this.state.updateButtonText}
            handleDashboardLogOutButton={this.handleDashboardLogOutButton}
            handleDashboardTodoInputChange={this.handleDashboardTodoInputChange}
            handleDashboardUpdateTodoInputChange={this.handleDashboardUpdateTodoInputChange}
            handleDashboardAddTaskButton={this.handleDashboardAddTaskButton}
            handleDashboardCancelButton={this.handleDashboardCancelButton}
            handleDashboardDeleteButton={this.handleDashboardDeleteButton}
            handleDashboardUpdateButton={this.handleDashboardUpdateButton}
          />
          :
          <div className="form-structor" id="form-structor">
            <div className={this.state.component === "register" ? 'signup' : 'signup slide-up'}>
              <h2 className="form-title" id="signup" onClick={this.handleSignUpText}><span>or</span>Sign up</h2>
              <Register
                registerUsernameError={this.state.registerUsernameError}
                registerPasswordError={this.state.registerPasswordError}
                registerConfirmPasswordError={this.state.registerConfirmPasswordError}
                handleRegisterButton={this.handleRegisterButton}
                handleRegisterUsernameInputChange={this.handleRegisterUsernameInputChange}
                handleRegisterPasswordInputChange={this.handleRegisterPasswordInputChange}
                handleRegisterConfirmPasswordInputChange={this.handleRegisterConfirmPasswordInputChange}
              />
            </div>
            <div className={this.state.component === "login" ? 'login' : 'login slide-up'}>
              <div className="center">
                <h2 className="form-title" id="login" onClick={this.handleLogInText}><span>or</span>Log in</h2>
                <Login
                  loginUsernameError={this.state.loginUsernameError}
                  loginPasswordError={this.state.loginPasswordError}
                  handleLogInButton={this.handleLogInButton}
                  handleLoginUsernameInputChange={this.handleLoginUsernameInputChange}
                  handleLoginPasswordInputChange={this.handleLoginPasswordInputChange}
                />
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default App;

