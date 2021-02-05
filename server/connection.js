const rethink = require("rethinkdb");

module.exports= async function(){
    return await rethink.connect({host: 'localhost', port: 28015, db: "UsersDB"})
}

