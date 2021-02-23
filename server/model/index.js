const { logDOM } = require("@testing-library/react");
const rethink = require("rethinkdb");
var connection = require("../connection");

module.exports = {

    login: async ({ loginUsername }) => {
        const cursor = await rethink.table('users')
            .filter(rethink.row('username').eq(loginUsername))
            .coerceTo('array')
            .run(await connection())
        return cursor
    },

    checkByUsername: async ({ registerUsername }) => {
        const cursor = await rethink.table('users')
            .filter(rethink.row('username').eq(registerUsername))
            .run(await connection())
        return cursor;
    },

    register: async ({ registerUsername, registerPassword }) => {
        const cursor = await rethink.table('users')
            .insert({
                username: registerUsername,
                password: registerPassword
            })
            .run(await connection())
        return cursor;
    },

    clearUser: async () => {
        const cursor = await rethink.table('users')
            .delete()
            .run(await connection())
        return cursor;
    },

    clearTask: async () => {
        const cursor = await rethink.table('tasks')
            .delete()
            .run(await connection())
        return cursor;
    },

    getTasks: async ({ userID }) => {
        const cursor = await rethink.table('tasks')
            .filter(rethink.row('userID').eq(userID))
            .orderBy(rethink.desc('taskAdded'))
            .run(await connection())
        return cursor;
    },

    addTask: async ({ userID, user, task }) => {
        const cursor = await rethink.table('tasks')
            .insert({
                userID: userID,
                username: user,
                task: task,
                taskAdded: new Date(),
            })
            .run(await connection())
        return cursor;
    },

    deleteTask: async ({ id }) => {
        const cursor = await rethink.table('tasks')
            .get(id)
            .delete()
            .run(await connection())
        return cursor;
    },

    updateTask: async ({ id, taskUpdate }) => {
        const cursor = await rethink.table('tasks')
            .get(id)
            .update({ task: taskUpdate })
            .run(await connection())
        return cursor;
    },
}