function Dashboard(props){

    const handleLogOutButton = () => {
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
          <button class="dashboard-btn" onClick={handleLogOutButton}>Log out</button>
        </div>
      )
}

export default Dashboard