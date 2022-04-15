const popUpLink =$("#pop-up-link")
const popUpTitle = $("#pop-up-name");
const popUpLocality = $("#pop-up-locality");
const popUp = $(".pop-up");
const closePopUpBtn = $("#close-pop-up")

function popUpOpen({name,locality,url}){
    popUpTitle.text(name);
    popUpLocality.text(locality)
    popUpLink.attr("href",url)
    popUp.removeClass("hide")
}

closePopUpBtn.on("click",()=>{
    popUp.addClass("hide");
})