import express from "express"
import bodyParser from "body-parser"
import {dirname} from "path"
import { fileURLToPath } from "url"
const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended : true}))

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/login.html")
})

app.post("/login",(req,res)=>{
    const password1 = req.body["password"]
    if(password1 === "hello")
    {
        res.sendFile(__dirname + "/index.html")
    }
    else
    {
        res.sendFile(__dirname + "/login.html")
    }
})

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})