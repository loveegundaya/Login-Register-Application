const rethink = require("rethinkdb");
var connection = require("../connection");

module.exports={
    
    login: async (data) => {
        try{
            let cursor= await rethink.table('users')
            .filter(rethink.row('username').eq(data.username))
            .filter(rethink.row('password').eq(data.password))
            .run(await connection())

            return cursor;

        }catch(error){
            return {message:'Internal Server Error'};
        }
    },

    checkByUsername: async ({username}) => {
        try {
            let cursor = await rethink.table('users')
            .filter(rethink.row('username').eq(username))
            .run(await connection())

            return cursor;

        } catch (error) {
            return {message:'Internal Server Error'};
        }
    },

    register: async (data) => {
        try{
            let result = await rethink.table('users').insert({
                username:data.username,
                password:data.password})
                .run(await connection())
            
                return result;

        }catch(error){
            return {message:'Internal Server Error'};
        }
    },

    clear: async () => {
        try {
            const result = await rethink.table('users')
            .delete()
            .run(await connection())

            return result;

        } catch (error) {
            return {message:"Error in Clearing Users Table"}
        }
        
    }
}