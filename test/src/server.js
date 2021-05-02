const {app} = require("./index")
const {connect} = require("./config/db")

const start = async () => {
    await connect;

    app.listen(2244, () => {
        console.log("Listening on port 2244");
    })
}

start()

console.log("Server has Started");