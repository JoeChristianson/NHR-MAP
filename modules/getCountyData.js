const {doesDataExist} = require("./doesDataExist")
const {readFile,writeFile} = require('fs')
const util = require("util")
const readFilePromise = util.promisify(readFile);
const {scrape} = require("./scraper")



const getCountyData = async (county,state)=>{
    if (await doesDataExist(county,state)){
        const data = await readFilePromise(`./data/${state}.json`,"utf-8");
        console.log(typeof data)
        console.log(data)
        return(data)
    }
    else {
        const data = await scrape(county,state);
        const dataString = await JSON.stringify(data)
        return dataString;
    }    
}

module.exports = {getCountyData}