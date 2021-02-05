const rethink = require("rethinkdb");
var connection = require("../connection");

module.exports={
    
    login: async (data) => {
        try{
            let cursor= await rethink.table('users')
            .filter(rethink.row('username').eq(data.username))
            .filter(rethink.row('password').eq(data.password))
            .run(await connection())

            let result = await cursor.toArray();  
            if(result.length>0){
                return {
                    success: true,
                    message:'Logged in successfully'
                };
            }else{
                return {
                    success: false,
                    message:'Credentials not found!'
                };                
           }

        }catch(error){
            return {message:'Internal Server Error'};
        }
    },

    register: async (data) => {
        try{
            let cursor = await rethink.table('users')
            .filter(rethink.row('username').eq(data.username))
            .run(await connection())

            let isExists = await cursor.toArray()
            if (isExists.length>0){
                return {
                    success: false,
                    message:'Username already exists'
                };
            }
            let result = await rethink.table('users').insert({
                username:data.username,
                password:data.password})
                .run(await connection())
                    
            if(result){
                return {
                    success: true,
                    message:'Registered Succesfully'
                };
            }
        }catch(error){
            return {message:'Internal Server Error'};
        }
    },

    clear: async () => {
        try {
            const result = await rethink.table('users')
            .delete()
            .run(await connection())
            if(result) return {message:"Users Successfully Table Cleared"}
        } catch (error) {
            return {message:"Error in Clearing Users Table"}
        }
        
    }
}