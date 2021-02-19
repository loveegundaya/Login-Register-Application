import React from 'react'

function Dashboard(props){
  return(
    <div> 
      <div style={{textAlign: 'center'}}> 
        <h1>Welcome {props.user}!</h1>
        <button className="dashboard-btn" onClick={props.handleDashboardLogOutButton}>Log out</button>
      </div>
      <div style={{display:"flex", alignItems:"center"}}>
        <div style={{display:"flex", alignItems:"center"}}>
            <input type="text" value={props.task} className="input" placeholder="add task" onChange={props.handleDashboardTodoInputChange}/>
            <span style={{color:"red"}}>{props.taskError?"*":""}</span>
        </div>
        <button onClick={props.handleDashboardAddTaskButton}>Add Task</button>
      </div>
      <div style={{textAlign: 'center'}}>
        <h3>TO DO LIST</h3>
      </div>
      {
        props.todoList?.map((element,index)=>{
        return<div key={index} style={{textAlign: 'center'}}>
          {props.updateButtonText!=="Update" && props.updateID===element.id? 
            (<input id={element.id} type="text" value={props.taskUpdate} className="input" placeholder="add task" onChange={props.handleDashboardUpdateTodoInputChange}/>) 
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
          <hr/>
          </div> 
        })
      }
    </div>
  )
}

export default Dashboard