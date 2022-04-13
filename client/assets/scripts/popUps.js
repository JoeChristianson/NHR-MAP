const popUpLink =$("#pop-up-link")
const popUpTitle = $("#pop-up-name");
const popUpLocality = $("#pop-up-locality");
const popUp = $(".pop-up");

function popUpOpen({name,locality,url}){
    popUpTitle.text(name);
    popUpLocality.text(locality)
    popUpLink.attr("href",url)
    popUp.removeClass("hide")
}