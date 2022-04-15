let APIkey = localStorage.getItem("NHRkey");
if (!APIkey){
    APIkey = prompt("Enter API key");
    localStorage.setItem("NHRkey",APIkey)
}    

const script = document.createElement("script");
script.setAttribute("src",`https://maps.googleapis.com/maps/api/js?key=${APIkey}&callback=initMap`);
document.getElementsByTagName("head")[0].appendChild(script);

