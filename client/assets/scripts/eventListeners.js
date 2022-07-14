// const searchBtn = $("#search-btn");
const countyInput = $("#county-input")
// const stateInput = $("#state-input")
const searchDropdown = $("#search-dropdown")

// searchBtn.on("click",()=>{
//     const county = countyInput.val().replace(" ","_");
//     const state = stateInput.val().replace(" ","_")
//     addMarkers(county,state)
// })

countyInput.on("keyup",async ()=>{
    searchDropdown.empty()
    const input = await countyInput.val()
    const matches = counties.filter(county=>{
        return county.includes(input)
    })

    if(input===""){
        return
    }
    for (let i = 0;(i<10)&&(i<matches.length);i++){
        const searchResult = $(`<div>${matches[i]}</div>`)
        searchResult.addClass("result")
        searchResult.val(matches[i])
        searchDropdown.append(searchResult)
    }
})

searchDropdown.on("click",".result",async (e)=>{
    const [county,state] = e.target.value.split(", ")
    searchDropdown.empty()
    countyInput.val("")
    await addMarkers(county,state)
})