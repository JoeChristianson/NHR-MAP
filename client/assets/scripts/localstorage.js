// let APIkey = localStorage.getItem("NHRkey");
// if (!APIkey){
//     APIkey = prompt("Enter API key");
//     localStorage.setItem("NHRkey",APIkey)
// }    

const APIkey = "AIzaSyD3ZSKMDWDWV1_4VsV6NiLhiFIP5UrGxO8"


const script = document.createElement("script");
script.setAttribute("src",`https://maps.googleapis.com/maps/api/js?key=${APIkey}&callback=currentCoordinates`);
document.getElementsByTagName("head")[0].appendChild(script);

