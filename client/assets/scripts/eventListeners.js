const searchBtn = $("#search-btn");
const countyInput = $("#county-input")
const stateInput = $("#state-input")
searchBtn.on("click",()=>{
    addMarkers(countyInput.val(),stateInput.val())
})
