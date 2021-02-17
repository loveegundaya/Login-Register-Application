const model = require("../model")

module.exports = function(app){

    app.post('/login', async (req, res) => {

        const {username, password} = req.body;
    
        if (username===""||password===""){
            res.send({
                success: false,
                message:"Fields are incomplete"
            })
            return
        }

        try {
            const cursor = await model.login({username, password})
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
    
        const {username, password, confirm_password} = req.body;
    
        if (username===""||password===""||confirm_password===""){
            res.send({
                success: false,
                message:"Fields are incomplete"
            })
        }
        else if ((confirm_password!==password)&&(confirm_password!==""&&password!=="")){
            res.send({
                success: false,
                message:"Passwords mismatched"
            })
        }

        try {
            let cursor = await model.checkByUsername({username})
            let isExists = await cursor.toArray()
            if (isExists.length>0){
                res.send({
                    success: false,
                    message:'Username already exists'
                });
            }
            else{
                let result = await model.register({username,password})
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
                        message:'Task Added Succesfully'
                    });
                }

        } catch (error) {
            res.send({message:'Internal server error'});
        }

    });
}
