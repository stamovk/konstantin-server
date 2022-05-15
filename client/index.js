const experss = require("express")
const bodyParser = require("body-parser")

const app = experss()
app.use(bodyParser.json())

app.post("/user/message", (req, res) => {
    console.log(req.body)
    res.end()
})

app.listen(5555, () => {
    console.log("listening on port 5555")
})
