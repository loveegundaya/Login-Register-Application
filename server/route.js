
module.exports = function(app){

const rethink = require("rethinkdb");
let connection = null;

rethink.connect( {host: 'localhost', port: 28015, db: "UsersDB"}, function(err, conn) {
    if (err) { throw err;}
   connection = conn;
})

app.get("/", (req, res) => {
    if(connection!=null){
        rethink.db('UsersDB').tableList().run(connection,(err,result)=>{
            if(!result.includes('users')){
                rethink.db('UsersDB').tableCreate('users').run(connection);
            }
        });
        res.send({message:'Server is ready'})
    }else{
        res.send({message:'Server is not ready'})
    }
});

app.post('/login',(req, res) => {

    const {username, password} = req.body;

    if (username===""||password===""){
        res.send({
            success: false,
            message:"Fields are incomplete"
        })
        return
    }

    rethink.table('users')
    .filter(rethink.row('username').eq(req.body.username))
    .filter(rethink.row('password').eq(req.body.password))
    .run(connection,(err,cursor)=>{
        if (err) {
            res.send({message:'Internal Server Error'})
            return;
        }

        cursor.toArray(function(err, result) {
            if (err) res.send({message:'Internal Server Error'});
            if(result.length>0){
                res.send({
                    success: true,
                    message:'Logged in successfully'});
            }else{
                res.send({
                    success: false,
                    message:'Credentials not found!'});
            }                
        });        
    })
});

app.post('/register',(req,res)=>{

    const {username, password, confirm_password} = req.body;

    if (username===""||password===""||confirm_password===""){
        res.send({
            success: false,
            message:"Fields are incomplete"
        })
        return
    }
    else if ((confirm_password!==password)&&(confirm_password!==""&&password!=="")){
        res.send({
            success: false,
            message:"Passwords mismatched"
        })
        return
    }

    rethink.table('users')
    .filter(rethink.row('username').eq(req.body.username))
    .run(connection,(err,cursor)=>{
        if (err) {
            res.send({message:'Internal Server Error'})
            return;
        }
        cursor.toArray(function(err, result) {
            if (err) res.send({
                success: false,
                message:'Internal Server Error'
            });
            if(result.length>0){
                res.send({
                    success: false,
                    message:'Username already exists'
                });
            }
            else{
                rethink.table('users').insert({
                    username:req.body.username,
                    password:req.body.password}).run(connection,(err,result)=>{
                        if (err) res.send({
                            success: false,
                            message:'Internal Server Error'
                        });
                        if(result) res.send({
                            success: true,
                            message:'Registered Succesfully'
                        });
                        
                })
            }
        });
    })
});

app.get("/clear", (req, res) => {
    rethink.table('users')
    .delete()
    .run(connection,(err,result)=>{
        if(err) res.send({message:"Error in Clearing Users Table"})
        if(result) res.send({message:"Users Successfully Table Cleared"})
    })
});

}