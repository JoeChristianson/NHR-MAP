const puppeteer = require('puppeteer')
const {write} = require("./dataWriter")

async function scrape(county,state){
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox','--disable-setuid-sandbox']
      });
    const url = `https://en.wikipedia.org/wiki/National_Register_of_Historic_Places_listings_in_${county}_County,_${state}`
    console.log(url)
    const page = await browser.newPage();
    await page.goto(url);
    const headings = await page.evaluate(()=> Array.from(document.querySelectorAll('.sortable td .mapframe-coord-name a'),element=> [element.textContent,element.href]));
    console.log(headings[0])
    const images = await page.evaluate(()=> Array.from(document.querySelectorAll('tbody img'),element=> element.src,));
    console.log(images[0])
    const addresses = await page.evaluate(()=> Array.from(document.querySelectorAll('.adr span.label'),element=> element.textContent));
    console.log(addresses[0]);
    const latitudes = await page.evaluate(()=> Array.from(document.querySelectorAll('.latitude'),element=> element.textContent));
    const longitudes = await page.evaluate(()=> Array.from(document.querySelectorAll('.longitude'),element=> element.textContent));
    console.log(latitudes[0])
    console.log(longitudes[0])
    const localities = await page.evaluate(()=> Array.from(document.querySelectorAll('.locality'),element=> element.textContent));
    console.log(localities[0])
    browser.close()
    const places = [];
    for(let i=0;i<headings.length;i++){
        const place = {
            name: headings[i][0],
            link: headings[i][1],
            image:images[i],
            latitude:latitudes[i],
            longitude:longitudes[i],
            locality:localities[i],
        }
        places.push(place)
    }
    write(county,state,places)
    return places;
}

scrape(process.argv[2],process.argv[3])

