import React, {useEffect, useState} from 'react'
import axios from 'axios'

function Test(props){

  const [task, setTask]= useState("")
  const [taskID, setTaskID]= useState("")
  const [taskUpdate, setTaskUpdate]= useState("")
  const [taskError, setTaskError]= useState(false)
  const [todoList, setToDoList] = useState([])
  const [updateButtonText, setUpdateButtonText] = useState("Update")
  const [updateButtonID, setUpdateButtonID] = useState("")


  async function fetchData(){
    let result = await axios.post('/get_tasks', {userID: props.userID})
    let newtodolist = result.data.payload
    setToDoList(newtodolist)
  }

  useEffect(()=>{
    fetchData();
  },[])

  const handleAddTaskButton = async (event) => {
    if (task==="") {
      setTaskError(true)
      return
    }
    let user = props.user
    let userID = props.userID
    const detail = {
      userID,
      user,
      task
   }
    try {
      const response = await axios.post('/add-task',detail)
      console.log(response);
      if (response.data.success){
          fetchData();
          setTask("")
          setTaskID(response)
      }
      else {
          alert(response.data.message)
      }
    } catch (e) {
        alert(e);
    }
    console.log(taskID);
  }

  const handleUpdateButton = async (event) =>{

    const {id, name} = event.target
    setTaskUpdate(name)

    if(updateButtonText==='Update'){
        setUpdateButtonID(id)
        setUpdateButtonText("Save")
      }
    else{

        const detail = {id,taskUpdate}
        try {
          const response = await axios.post('/update_task',detail)
          if (response.data.success){
            
            fetchData()
          }
          else {
              alert(response.data.message)
          }
        } catch (e) {
            alert('Error occured');
        }

        setUpdateButtonID("")
        setUpdateButtonText('Update')
      }
  }

  const handleDeleteButton = async (event) => {

    const {id} = event.target
    
    const detail = {
      id
    }

    try {
      const response = await axios.post('/delete_task',detail)
      if (response.data.success){
        fetchData()
      }
      else {
          alert(response.data.message)
      }
    } catch (e) {
        alert('Error occured');
    }

  }
  
  const handleCancelButton = () => {
    setUpdateButtonID("")
    setUpdateButtonText('Update')
  }

  const handleLogOutButton = () => {
    localStorage.setItem("username", "")
    localStorage.setItem("component", "login")
    console.log(todoList);
    setToDoList([])
    props.changeComponent("login")
  }

  const handleTodoInputChange = (event) => {
    setTask(event.target.value)
  }

  const handleUpdateInputChange = (event) => {
    setTaskUpdate(event.target.value)
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
        {updateButtonText!=="Update" && updateButtonID===element.id? 
          (<input id={element.id} type="text" value={taskUpdate} className="input" placeholder="add task" onChange={handleUpdateInputChange}/>) 
          :   
          <span id={element.id}>{element.task}</span> 
        }
        <br></br>
        {updateButtonText!=="Update" && updateButtonID===element.id? 
          (<button id={element.id} onClick={handleCancelButton}>Cancel</button>)
          :
          <button id={element.id} onClick={handleDeleteButton}>Delete</button>
        }
        <button id={element.id} name={element.task} onClick={handleUpdateButton}>{updateButtonID===element.id?'Save':'Update'}</button>
        <hr/>
        </div> 
        })
      }

    </div>
  )
}

export default Test