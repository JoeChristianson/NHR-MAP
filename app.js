const express = require("express");
const app = express();
const cors = require("cors")
const port = 4000;
const {getCountyData} = require("./modules/getCountyData")

// app.use(cors({
//     origin: '*'
// }));

app.use(express.static('client'))

app.get("/api", async (req,res)=>{
    const {query} = req;
    const state = await getCountyData(query.county,query.state);
    console.log(state?"State data produced":"No state Data")
    const county = JSON.parse(state)[query.county];
    if (county){
        res.send(county)
        console.log("Data sent")
    }
    else res.send({adding:true})
})

app.listen(port, ()=>{
    console.log("listing on port: "+port)
})