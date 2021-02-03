const express = require('express')
const app = express();
const port = 3000 || process.env.port
const router = require('../router/index')



app.use(express.json())
app.use(router)


app.listen(port, (err)=>{
    if(err){
        console.log("Server couldn't start");
        return 0;
    }
    console.log("Server is up and running on port", port)
})