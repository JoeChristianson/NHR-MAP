const express = require("express");
const app = express();
const cors = require("cors")
const port = 3000;
const {getCountyData} = require("./modules/getCountyData")

app.use(cors({
    origin: '*'
}));

app.get("/", async (req,res)=>{
    const {query} = req;
    const state = await getCountyData(query.county,query.state);
    const parsedState = JSON.parse(state);
    const county = JSON.parse(state)[query.county];
    res.send(county)
})

app.listen(port, ()=>{
    console.log("listing on port: "+port)
})