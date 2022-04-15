const getData = async (county,state)=>{
    console.log(state);
    const url = `http://localhost:3000/?county=${county}&state=${state}`
    const res = await fetch(url);
    console.log(res);
    const data = await res.json();
    if (!data?.adding){
        return data;
    }
    else return getData(county,state);
}