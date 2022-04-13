const {doesDataExist} = require("./doesDataExist")
const {readFile,writeFile} = require('fs')
const util = require("util")
const readFilePromise = util.promisify(readFile);
const {scrape} = require("./scraper")



const getCountyData = async (county,state)=>{
    if (await doesDataExist(county,state)){
        const data = readFilePromise(`../data/${state}.json`,"utf-8");

        return(data)
    }
    else {
        const data = await scrape(county,state);

        return data;
    }    
}

module.exports = {getCountyData}