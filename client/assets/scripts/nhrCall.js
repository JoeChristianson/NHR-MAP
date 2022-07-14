

const getData = async (county,state)=>{

    const loadingPopUp = document.querySelector("#loading");

    loadingPopUp.classList.remove("hide")

    const url = `/api?county=${county}&state=${state}`
    const res = await fetch(url);
    const data = await res.json();
    if (!data?.adding){
        loadingPopUp.classList.add("hide")
        return data;
    }
    else return getData(county,state);
}