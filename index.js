const express = require("express")
const bodyParser = require("body-parser")
const { router } = require("./app/route/route")

const app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended : true
}))

app.use(router)

var port = 8090
app.use("/", (req, res) => {
    res.send(
        { status : true, message : "Alive!!!"}
    )
})

app.use("*", (req, res) => {
    res.send(
        { status : false, message : "URL not found"}
    )
})

app.listen(port, () => {
    console.log(`Server is running o port ${port}`);
})

