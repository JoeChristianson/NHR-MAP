const puppeteer = require('puppeteer')
const {write} = require("./dataWriter")

async function scrape(county,state){
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox','--disable-setuid-sandbox']
      });
    const url = `https://en.wikipedia.org/wiki/National_Register_of_Historic_Places_listings_in_${county}_County,_${state}`
    const page = await browser.newPage();
    await page.goto(url);
    const headings = await page.evaluate(()=> Array.from(document.querySelectorAll('.sortable .mapframe-coord-name a'),element=> [element.textContent,element.href]));
    console.log(headings[0])
    const images = await page.evaluate(()=> Array.from(document.querySelectorAll('tbody .center a.image img,td .plainlinks.metadata.noprint small a'),element=> element.src,));
    console.log(images[0])
    const addresses = await page.evaluate(()=> Array.from(document.querySelectorAll('.adr span.label'),element=> element.textContent));
    const latitudes = await page.evaluate(()=> Array.from(document.querySelectorAll('.latitude, img[src="//upload.wikimedia.org/wikipedia/commons/2/22/Address_restricted.PNG"]'),element=> element.textContent));
    const longitudes = await page.evaluate(()=> Array.from(document.querySelectorAll('.longitude, img[src="//upload.wikimedia.org/wikipedia/commons/2/22/Address_restricted.PNG"]'),element=> element.textContent));
    const localities = await page.evaluate(()=> Array.from(document.querySelectorAll('.locality'),element=> element.textContent));
    const restr = await page.evaluate(()=> Array.from(document.querySelectorAll('img[src="//upload.wikimedia.org/wikipedia/commons/2/22/Address_restricted.PNG"]'),element=> element.textContent));
    console.log("these are the restricted locales");
    console.log(restr);
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
            googleMapsLink:`https://google.com/maps/place/${latitudes[i]}+${longitudes[i]}`
        }
        places.push(place)
    }
    write(county,state,places)
    return places;
}

module.exports = {scrape}

