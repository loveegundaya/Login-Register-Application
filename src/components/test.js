import React, {useEffect, useState} from 'react'
import axios from 'axios'

function Test(props){

  const [task, setTask]= useState("")
  const [taskError, setTaskError]= useState(false)
  const [todoList, setToDoList] = useState([])


  useEffect(async ()=>{
    async function fetchData(){
      let result = await axios.post('/get_tasks', {userID: props.userID})
      let todolist = result.data.payload
      setToDoList(todolist)
    }
    fetchData();
  }, [todoList])

  const handleAddTaskButton = async (event) => {

    if (task==="") {
      setTaskError(true)
      return
    }

    let user = props.user
    let userID = props.userID

    console.log(userID);

    const detail = {
      userID,
      user,
      task
   }

    try {
      const response = await axios.post('/add-task',detail)
      if (response.data.success){
          alert(response.data.message)
          setTask("")
      }
      else {
          alert(response.data.message)
      }

    } catch (e) {
        alert(e);
    }
    
  }

  const handleLogOutButton = () => {
    localStorage.setItem("username", "")
    localStorage.setItem("component", "login")
    setToDoList([])
    props.changeComponent("login")
  }

  const handleTodoInputChange = (event) => {
    setTask(event.target.value)
    setTaskError(false)
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

      <div style={{display:"flex", alignItems:"center"}}>
        <div style={{display:"flex", alignItems:"center"}}>
            <input type="text" value={task} className="input" placeholder="add task" onChange={handleTodoInputChange}/>
            <span style={{color:"red"}}>{taskError?"*":""}</span>
        </div>
        <button onClick={handleAddTaskButton}>Add Task</button>
      </div>

      {
            todoList?.map((element,index)=>{
            return<div key={index} style={style1}>
            <span>{element.task}</span>
            <br></br>
            <button>Update</button>
            <button>Delete</button>
            <hr/>
            </div> 
          })
      }

    </div>
  )
}

export default Test