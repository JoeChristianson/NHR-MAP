const {readFile,writeFile} = require('fs')
const util = require("util")
const readFilePromise = util.promisify(readFile);
const writeFilePromise = util.promisify(writeFile)

const write = async (county,state,places)=>{
    const data = await readFilePromise(`./data/${state}.json`,"utf-8");
    console.log("here is the type of data in write");
    console.log(typeof data)
    const obj = JSON.parse(data);
    obj[county] = places;
    const str = JSON.stringify(obj)
    writeFilePromise(`./data/${state}.json`,str)
}

module.exports = {write}