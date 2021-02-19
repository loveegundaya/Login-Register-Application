const model = require("../model")

module.exports = function(app){

    app.get('/get_all_users', async (req, res) => {
        try {            
            let result = await model.getAllUsers()
            let users = await result.toArray()
            if (users.length>0){
                res.send({
                    success: false,
                    message:'Users read successfully',
                    payload: users
                });
            }
            else{
                res.send({
                    success: true,
                    message:'Nothing to show',
                });
            }
        } catch (error) {
            res.send({message:"Error in Getting Users"});
        }
    })

    app.post('/login', async (req, res) => {
        const {userid} = req.body;
        try {
            const cursor = await model.login({userid})
            const result = await cursor.toArray();  
            if(result.length>0){
                res.send({
                    success: true,
                    message:'Logged in successfully',
                    payload: result[0]
                });
            }else{
                res.send({
                    success: false,
                    message:'Credentials not found!'
                });                
            }
        } catch (error) {
            res.send({message:'Internal Server Error'});
        }
    });

    app.post('/register',async (req,res)=>{
        const {registerUsername, registerPassword, registerConfirmPassword} = req.body;
        if (registerUsername===""||registerPassword===""||registerConfirmPassword===""){
            res.send({
                success: false,
                message:"Fields are incomplete"
            })
        }
        else if ((registerPassword!==registerConfirmPassword)&&(registerPassword!==""&&registerConfirmPassword!=="")){
            res.send({
                success: false,
                message:"Passwords mismatched"
            })
        }
        try {
            let cursor = await model.checkByUsername({registerUsername})
            let isExists = await cursor.toArray()
            if (isExists.length>0){
                res.send({
                    success: false,
                    message:'Username already exists'
                });
            }
            else{
                let result = await model.register({registerUsername,registerPassword})
                if(result){
                    res.send({
                        success: true,
                        message:'Registered Succesfully',
                        payload: result
                    });
                }
            }
        } catch (error) {
            res.send({message:'Internal Server Error'});
        }
    });

    app.get("/clear_user", async (req, res) => {
        try {            
            let result = await model.clearUser()
            if(result) res.send({message:"Users Successfully Table Cleared"});
        } catch (error) {
            res.send({message:"Error in Clearing Users Table"});
        }
    });

    app.get("/clear_task", async (req, res) => {
        try {            
            let result = await model.clearTask()
            if(result) res.send({message:"Tasks Successfully Table Cleared"});
        } catch (error) {
            res.send({message:"Error in Clearing Users Table"});
        }
    });

    app.post("/get_tasks", async (req, res) => {

        const {userID} = req.body;
        try {            
            let cursor = await model.getTasks({userID})
            let tasks = await cursor.toArray()
            if (tasks.length>0){
                res.send({
                    success: false,
                    message:'Tasks read successfully',
                    payload: tasks
                });
            }
            else{
                res.send({
                    success: true,
                    message:'Nothing to show',
                });
            }
        } catch (error) {
            res.send({message:"Error in Getting Tasks"});
        }
    });

    app.post('/add-task', async (req, res) => {
        const {userID,user, task} = req.body;
        if (task===""){
            res.send({
                success: false,
                message:"Fields are incomplete"
            })
            return
        }
        try {

            let result = await model.addTask({userID,user,task})
            if(result){
                    res.send({
                        success: true,
                        message:'Task Added Succesfully',
                        payload: result
                    });
                }
        } catch (error) {
            res.send({message:'Internal server error'});
        }
    });

    app.post('/delete_task', async (req, res) => {
        const {id} = req.body;
        try {

            let result = await model.deleteTask({id})
            if(result){
                    res.send({
                        success: true,
                        message:'Task Deleted Succesfully'
                    });
                }

        } catch (error) {
            res.send({message:'Internal server error'});
        }
    });

    app.post('/update_task', async (req, res) => {
        const {id,taskUpdate} = req.body;
        try {
            let result = await model.updateTask({id,taskUpdate})
            if(result){
                    res.send({
                        success: true,
                        message:'Task Updated Succesfully'
                    });
                }

        } catch (error) {
            res.send({message:'Internal server error'});
        }
    });
}
