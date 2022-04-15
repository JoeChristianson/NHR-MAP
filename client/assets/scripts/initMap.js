// Initialize and add the map
class Site{
  constructor(site){
    this.name=site.name;
    this.latitude= convertLocationValues(site.latitude);
    this.longitude= convertLocationValues(site.longitude);
    this.image=site.image;
    this.locality=site.locality;
    this.url = site.link;
  }
}

const sites = []

async function initMap() {
    const uluru = { lat: -25.344, lng: 131.036 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });
}

async function addMarkers(county,state){
  sites.length = 0;
  const items = await getData(county,state);
  console.log(items)
  for(let item of items){

    const site = new Site(item);
    sites.push(site)
  }
  const center = {lat: sites[1].latitude,lng: sites[1].longitude}

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: center,
  });
  sites.forEach(site=>{
    if (site.longitude && site.latitude){
      const marker = new google.maps.Marker({
        position: {lat:site.latitude,lng:site.longitude},
        map: map,
        label: site.name,
        icon: {url:site.image,
          scaledSize: new google.maps.Size(100, 100),
        },
        title: site.name,
      });
      marker.addListener("click", ()=>{
        console.log(site.locality)
        popUpOpen(site)
      })
    }
  }
  )
}


