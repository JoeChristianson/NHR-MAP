const getData = async (county,state)=>{
    const url = `http://localhost:3000/?county=${county}&state=${state}`
    const res = await fetch(url);
    const data = await res.json();
    return data;
}