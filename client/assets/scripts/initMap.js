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

    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: coord,
    });
    if (!currentAllow) return;
    console.log("Current Allow")
    addCurrentLocationMarker(map)
}

async function addMarkers(county,state){
  const defaultMarkerURL = "https://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-PNG-File.png"
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
  if (currentAllow){
    addCurrentLocationMarker(map);
  }


  sites.forEach(site=>{
    console.log(site)

    if (site.longitude && site.latitude){
      const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent(site)
      })


      const marker = new google.maps.Marker({
        position: {lat:site.latitude,lng:site.longitude},
        map: map,
        label: site.name,
        icon: {url:defaultMarkerURL,
          scaledSize: new google.maps.Size(100, 100),
        },
        title: site.name,
      });
      marker.addListener("click", ()=>{
        infoWindow.open(map,marker)
      })
    }
  }
  )
}


function addCurrentLocationMarker(map){
  const currentMarkerURL= "https://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-PNG-File.png";
  const marker = new google.maps.Marker({
    position: coord,
    map: map,
    icon: {url:currentMarkerURL,
      scaledSize: new google.maps.Size(50, 50),
    },
    title: "current location"
  });
}

function infoWindowContent(site){
  return `
  <div class="info-cont">
  <h3>${site.name}</h3>
  <h4>${site.locality}</h4>
  <img class="info-window-image" src=${site.image}>
  <a href=${site.url} target="_blank">More Information</a>
  </div>
  `
}