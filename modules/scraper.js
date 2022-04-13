const puppeteer = require('puppeteer')
const {write} = require("./dataWriter")
const {findBetweenSp} = require("./utils")

async function scrape(county,state){
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox','--disable-setuid-sandbox']
      });
    const url = `https://en.wikipedia.org/wiki/National_Register_of_Historic_Places_listings_in_${county}_County,_${state}`
    const page = await browser.newPage();
    await page.goto(url);
    const headings = await page.evaluate(()=> Array.from(document.querySelectorAll('.sortable .mapframe-coord-name a'),element=> [element.textContent,element.href]));
    const images = await page.evaluate(()=> Array.from(document.querySelectorAll('tbody .center a.image img,td .plainlinks.metadata.noprint small a'),element=> element.src,));
    const addresses = await page.evaluate(()=> Array.from(document.querySelectorAll('.adr'),element=> element.innerHTML));
    // const latitudes = await page.evaluate(()=> Array.from(document.querySelectorAll('.adr'),element=> element.textContent));
    const restr = await page.evaluate(()=> Array.from(document.querySelectorAll('img[src="//upload.wikimedia.org/wikipedia/commons/2/22/Address_restricted.PNG"]'),element=> element.textContent));
    browser.close()
    const places = [];
    for(let i=0;i<headings.length;i++){
        const latitudeString =findBetweenSp(addresses[i],'class="latitude"',"N");
        const longitudeString =findBetweenSp(addresses[i],'class="longitude"',"W");
        const place = {
            name: headings[i][0],
            link: headings[i][1],
            image:images[i],
            address:addresses[i],
            latitude:latitudeString?.split(">")[1],
            longitude:longitudeString?.split(">")[1],
            // googleMapsLink:`https://google.com/maps/place/${latitudes[i]}+${longitudes[i]}`
        }

        places.push(place)
    }
    // this is disabled for testing reasons
    write(county,state,places)
    console.log(places)
    return places;
}

module.exports = {scrape}

