const {readFile,writeFile} = require('fs')
const util = require("util")
const readFilePromise = util.promisify(readFile);
const writeFilePromise = util.promisify(writeFile)

const doesDataExist = async (county,state)=>{
    const data = await readFilePromise(`../data/${state}.json`,"utf-8")
    const obj = JSON.parse(data);
    if (!obj[county]){
        console.log(false)
        return false;
    }
    else {
        console.log(true)
        return true;}
}

doesDataExist("Bottineau","North_Dakota");
