const express = require("express");
const app = express();
const cors = require("cors")
const port = process.env.PORT || 5000;
const {getCountyData} = require("./modules/getCountyData")

// app.use(cors({
//     origin: '*'
// }));

app.use(express.static('client'))

app.get("/api", async (req,res)=>{

    const {query} = req;
    const state = await getCountyData(query.county,query.state);

    const county = JSON.parse(state)[query.county];
    if (county){
        res.send(county)
        console.log("Data sent, my dude")
    }
    else res.send({adding:true})
})

app.listen(port, ()=>{
    console.log("listening on port: "+port)
})