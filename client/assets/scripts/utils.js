// 46°55′16″N
function convertLocationValues(value){
    if (typeof value != "string" || value === "" || value.includes("missing") || value.includes("Restricted") || value.includes("Restricted")){
        return undefined;
    }
    const unallowed = ["a","b","c","d","e","f","g"]
    for (let i = 0;i<unallowed.length;i++){
        if (value.includes(unallowed[i])){
            return undefined;
        }
    }

    const obj = parseDMS(value);
    for (let prop in obj){
        if (prop!= "direction"){
            obj[prop] = parseInt(obj[prop])
        }
    }
    const res = convertDMSToDD(obj);
    return res;
}


function parseDMS(latLon){
    let parse = latLon.split("°");
    const degrees = parse[0];
    parse = parse[1].split("′");
    const minutes = parse[0];
    const [seconds,direction] = parse[1].split("″");
    return {degrees,minutes,seconds,direction};
}

function convertDMSToDD({degrees, minutes, seconds, direction}) {
    var dd = degrees + minutes/60 + seconds/(60*60);
    if (direction == "S" || direction == "W") {
        dd = dd * -1;
    } 
    return dd;
}
let coord;
let currentAllow = false;
async function currentCoordinates(){
    let coords;
    const call = await navigator.geolocation.getCurrentPosition((position)=>{
        coord = {lat:position.coords.latitude,lng:position.coords.longitude};
        currentAllow=true;
        initMap()
        return position;
    },()=>{
        coord={lat:40.7128,lng:-74.006}

        initMap()
    });
}



