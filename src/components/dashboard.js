function Dashboard(props){

    const style1 = {
        textAlign: 'center',
        center: 'true'
    }

    return(
        <div style={style1}> 
          <br></br>
          <h1>Welcome {props.user}</h1>
        </div>
      )
}

export default Dashboard