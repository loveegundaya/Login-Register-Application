
module.exports = function(app){

var express = require('express');
const rethink = require("rethinkdb");
let connection = null;
const port = 9000;

rethink.connect( {host: 'localhost', port: 28015, db: "UsersDB"}, function(err, conn) {
    if (err) throw err;
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
    rethink.table('users')
    .filter(rethink.row('username').eq(req.body.username))
    .filter(rethink.row('password').eq(req.body.password))
    .run(connection,(err,cursor)=>{
        cursor.toArray(function(err, result) {
            if (err) res.send({message:'Internal Server Error'});
            if(result.length>0){
                res.send({message:'Logged in successfully'});
            }else{
                res.send({message:'Credentials not found!'});
            }                
        });        
    })
});

app.post('/register',(req,res)=>{
    rethink.table('users')
    .filter(rethink.row('username').eq(req.body.username))
    .run(connection,(err,cursor)=>{
        cursor.toArray(function(err, result) {
            if (err) res.send({message:'Internal Server Error'});
            if(result.length>0){
                res.send({message:'Username already exists'});
            }
            else{
                rethink.table('users').insert({
                    username:req.body.username,
                    password:req.body.password}).run(connection,(err,result)=>{
                        if (err) res.send({message:'Internal Server Error'});
                        if(result) res.send({message:'Registered Succesfully'});
                        
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