const model = require("../model")

module.exports = function (app) {

    app.post('/login', async (req, res) => {
        const { loginUsername, loginPassword } = req.body;
        try {
            const cursor = await model.login({ loginUsername })
            const [result] = cursor
            if (result && result.password === loginPassword) {
                res.send({
                    success: true,
                    message: 'Logged in successfully',
                    payload: result.id
                });
            }
            else {
                res.send({
                    success: false,
                    message: 'Credentials not found!',
                });
            }
        } catch (error) {
            res.send({ message: 'Internal Server Error', error });
        }
    });

    app.post('/register', async (req, res) => {
        const { registerUsername, registerPassword, registerConfirmPassword } = req.body;
        if (registerUsername === "" || registerPassword === "" || registerConfirmPassword === "") {
            res.send({
                success: false,
                message: "Fields are incomplete"
            })
        }
        else if ((registerPassword !== registerConfirmPassword) && (registerPassword !== "" && registerConfirmPassword !== "")) {
            res.send({
                success: false,
                message: "Passwords mismatched"
            })
        }
        try {
            const cursor = await model.checkByUsername({ registerUsername })
            const isExists = await cursor.toArray()
            if (isExists.length > 0) {
                res.send({
                    success: false,
                    message: 'Username already exists'
                });
            }
            else {
                const result = await model.register({ registerUsername, registerPassword })
                if (result) {
                    res.send({
                        success: true,
                        message: 'Registered Succesfully',
                        payload: result.generated_keys[0]
                    });
                }
            }
        } catch (error) {
            res.send({ message: 'Internal Server Error' });
        }
    });

    app.get("/clear_user", async (req, res) => {
        try {
            const result = await model.clearUser()
            if (result) res.send({ message: "Users Successfully Table Cleared" });
        } catch (error) {
            res.send({ message: "Error in Clearing Users Table" });
        }
    });

    app.get("/clear_task", async (req, res) => {
        try {
            const result = await model.clearTask()
            if (result) res.send({ message: "Tasks Successfully Table Cleared" });
        } catch (error) {
            res.send({ message: "Error in Clearing Users Table" });
        }
    });

    app.post("/get_tasks", async (req, res) => {

        const { userID } = req.body;
        try {
            const cursor = await model.getTasks({ userID })
            const tasks = await cursor.toArray()
            if (tasks.length > 0) {
                res.send({
                    success: true,
                    message: 'Tasks read successfully',
                    payload: tasks
                });
            }
        } catch (error) {
            res.send({ message: "Error in Getting Tasks" });
        }
    });

    app.post('/add-task', async (req, res) => {
        const { userID, user, task } = req.body;
        if (task === "") {
            res.send({
                success: false,
                message: "Fields are incomplete"
            })
            return
        }
        try {

            const result = await model.addTask({ userID, user, task })
            if (result) {
                res.send({
                    success: true,
                    message: 'Task Added Succesfully',
                    payload: result
                });
            }
        } catch (error) {
            res.send({ message: 'Internal server error' });
        }
    });

    app.post('/delete_task', async (req, res) => {
        const { id } = req.body;
        try {

            const result = await model.deleteTask({ id })
            if (result) {
                res.send({
                    success: true,
                    message: 'Task Deleted Succesfully'
                });
            }

        } catch (error) {
            res.send({ message: 'Internal server error' });
        }
    });

    app.post('/update_task', async (req, res) => {
        const { id, taskUpdate } = req.body;
        try {
            const result = await model.updateTask({ id, taskUpdate })
            if (result) {
                res.send({
                    success: true,
                    message: 'Task Updated Succesfully'
                });
            }

        } catch (error) {
            res.send({ message: 'Internal server error' });
        }
    });
}
