 async function main(){
    //get user location
    async function getUserLocation(){
        pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        })
        return [pos.coords.latitude, pos.coords.longitude]
    }
    //map object
    const myMap = {
        coordinates: [],
        bussiness: [],
        map: {},
        markers: {},
        //map constructor
        buildMap(){
            this.map = L.map('map').setView(this.coordinates,15)
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
        }
    }
    //bussiness type
    document.getElementById('submit').addEventListener('click', async (event) => {
        let business = document.getElementById('business').value
        console.log(business)
        })
    //window load
    window.onload = async () =>{
        const coords = await getUserLocation()
        console.log(coords)
        myMap.coordinates = coords
        myMap.buildMap()
    }
}
main()