//map object
const myMap = {
    coordinates: [],
    businesses: [],
    map: {},
    markers: {},
    //map constructor
    buildMap(){
        this.map = L.map('map',{
            center: this.coordinates,
            zoom: 12,
        });
    //openstreetmap tiles
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);
        //map markers
        const marker = L.marker(this.coordinates)
        marker
        .addTo(this.map)
        .bindPopup('<p1><b>You are here</b><br></p1>')
        .openPopup()
    },
    //business markers
    addBusinessMarkers(){
    for(let i = 0; i < this.businesses.length; i++){
        this.markers = L.marker([
            this.businesses[i].lat,
            this.businesses[i].long,
        ])
            .bindPopup(`<p1>${this.businesses[i].name}</p1>`)
            .addTo(this.map)
        }
    },
}
//get user location
async function getUserLocation(){
    const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    });
    return [pos.coords.latitude, pos.coords.longitude]
}
//get business data from foursquare
async function getBusinessData(){
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'fsq36nSSq2Pj7eW89zx41WvHsr9S4yKmcDbRnrFpq/w2UIU='
        }
    };
    let limit = 5
    let lat = myMap.coordinates[0]
    let lon = myMap.coordinates[1]
    let response = await fetch('https://api.foursquare.com/v3/places/search', options)
    let data = await response.text()
    let parseData = JSON.parse(data)
    let businesses = parseData.results
    return businesses
}
//forsquare data process
function processBusinessData(data){
    let businesses = data.map((element) =>{
        let location = {
            name: element.name,
            lat: element.geocodes.main.latitude,
            long: element.geocodes.main.longitude
        };
        return location
    })
    return businesses
}
//window load
window.onload = async () =>{
    const coords = await getUserLocation()
    console.log(coords)
    myMap.coordinates = coords
    myMap.buildMap()
}
//businesses type
document.getElementById('submit').addEventListener('click', async (event) => {
     event.preventDefault()
    let business = document.getElementById('business').value
    let data = await getBusinessData(business)
    myMap.businesses = processBusinessData(data)
    myMap.addBusinessMarkers()
     })