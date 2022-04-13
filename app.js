const express = require("express");
const app = express();
const port = 3000;
const {getCountyData} = require("./modules/getCountyData")

app.get("/", async (req,res)=>{
    const {query} = req;
    console.log(query)
    const data = await getCountyData(query.county,query.state);
    console.log(data)
    res.send(data)
})

app.listen(port, ()=>{
    console.log("listing on port: "+port)
})