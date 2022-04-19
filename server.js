const express  = require("express")
const morgan  = require("morgan")
const bodyParser  = require("body-parser")
const cookieParser  = require("cookie-parser")
const cors  = require("cors")
require("dotenv").config()

//app
const app= express()   //loading express app features on app variable

//middlewares--->adding middlewares to our app
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors());

//routes
app.get('/api',(req,res)=>{
    res.json({time:Date().toString()})
})

//port
const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`server is listening at port ${port}`)
})