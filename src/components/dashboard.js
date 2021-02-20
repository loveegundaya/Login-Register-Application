import React from 'react'

function Dashboard(props){
  return(
    <div> 
      <div style={{textAlign: 'center'}}>
        <div  className="todo_header"> 
          <h2>Welcome {props.user}!</h2>
          <p style={{opacity:"0.6"}}>To-do List</p>
        </div>
        <div style={{display:"flex", alignItems:"center"}}>
          <div style={{display:"flex", alignItems:"center"}}>
              <input type="text" value={props.task} className="input" placeholder="input task" onChange={props.handleDashboardTodoInputChange}/>
              <span style={{color:"red"}}>{props.taskError?"*":""}</span>
          </div>
          <button onClick={props.handleDashboardAddTaskButton}>Add Task</button>
        </div>
      </div>
      <div style={{textAlign: 'center'}}>
        <br></br>
        {
          props.todoList?.map((element,index)=>{
          return<div key={index} style={{textAlign: 'center'}}>
            {props.updateButtonText!=="Update" && props.updateID===element.id? 
              (<input id={element.id} type="text" value={props.taskUpdate} className="input" onChange={props.handleDashboardUpdateTodoInputChange}/>) 
              :   
              <span id={element.id}>{element.task}</span> 
            }
            <br></br>
            {props.updateButtonText!=="Update" && props.updateID===element.id? 
              (<button id={element.id} onClick={props.handleDashboardCancelButton}>Cancel</button>)
              :
              <button id={element.id} onClick={props.handleDashboardDeleteButton}>Delete</button>
            }
            <button id={element.id} name={element.task} onClick={props.handleDashboardUpdateButton}>{props.updateID===element.id?"Save":"Update"}</button>
        
            <div style={{textAlign: 'center'}}>
              <hr/>
            </div>
            </div> 
          })
        }
      </div>
      <button className="dashboard-btn" onClick={props.handleDashboardLogOutButton}>Log out</button>
    </div>
  )
}

export default Dashboard