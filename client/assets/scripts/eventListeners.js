const searchBtn = $("#search-btn");
const countyInput = $("#county-input")
const stateInput = $("#state-input")

searchBtn.on("click",()=>{
    const county = countyInput.val().replace(" ","_");
    const state = stateInput.val().replace(" ","_")
    addMarkers(county,state)
})

