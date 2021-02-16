function Dashboard(props){

    const handleLogOutButton = () => {
      localStorage.setItem("username", "")
      localStorage.setItem("component", "login")
      props.changeComponent("login")
    }

    const handleTodoInputChange = (event) => {
        console.log(event.target.value);
    }

    const style1 = {
        textAlign: 'center',
    }

    return(
        <div> 
          <div style={style1}> 
            <h1>Welcome {props.user}!</h1>
            <button className="dashboard-btn" onClick={handleLogOutButton}>Log out</button>
          </div>

          <div>
            <input type="text" className="input" placeholder="add task" onChange={handleTodoInputChange}/>
            <button>Add</button>
          </div>

        </div>
      )
}

export default Dashboard