function Dashboard(props){

    const handleLogOutButton = () => {
      localStorage.setItem("username", "")
      localStorage.setItem("component", "login")
      props.changeComponent("login")
    }

    const style1 = {
        textAlign: 'center',
        center: 'true'
    }

    return(
        <div style={style1}> 
          <br></br>
          <h1>Welcome {props.user}!</h1>
          <button className="dashboard-btn" onClick={handleLogOutButton}>Log out</button>
        </div>
      )
}

export default Dashboard