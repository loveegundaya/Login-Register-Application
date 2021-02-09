
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

        let result = await model.login({username, password})
        res.send(result)

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

       let result = await model.register({username,password})
       res.send(result)
    });


    app.get("/clear", async (req, res) => {
       let result = await model.clear()
       res.send(result)
    });
}
