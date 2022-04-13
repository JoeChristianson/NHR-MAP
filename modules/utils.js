const findBetweenSp = (text,openingString,closingString)=>{
    const arr = [];
    let subStart = "";
    let subEnd = "";
    let inner = "";
    for (let i = 0;i<text.length;i++){
        if(subStart===openingString){
            if(text[i]===closingString[subEnd.length]){
                subEnd+=text[i];
            }
            if(subEnd === closingString){
                arr.push(openingString+inner+closingString);
                inner=""
                subStart="";
                subEnd =""
            }
            else inner+=text[i];
        }
        else if(text[i]!==openingString[subStart.length]){
            subStart=""
        }
        else if(text[i]===openingString[subStart.length]){
            subStart+=text[i]
        }
    }
    return arr[0];
}


module.exports = {findBetweenSp}