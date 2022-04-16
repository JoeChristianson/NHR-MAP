const {readFile,writeFile,existsSync} = require('fs')
const util = require("util")
const readFilePromise = util.promisify(readFile);
const writeFilePromise = util.promisify(writeFile)

const doesDataExist = async (county,state)=>{
    const fileExists = await existsSync(`./data/${state}.json`);
    console.log(fileExists)
    if (!fileExists){
        console.log("FILE DOES NOT EXIST");
        await writeFilePromise(`./data/${state}.json`,"{}",err=>{
            err?console.log(err):null;
        })
        return false;
    }

    const data = await readFilePromise(`./data/${state}.json`,"utf-8")
    console.log("This is the data:" + data + "here it is.")
    const obj = await JSON.parse(data);
    if (obj[county]===undefined){
        return false;
    }
    else {
        return true;}
}


module.exports = {doesDataExist}