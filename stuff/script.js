//get user location
async function getCoords(){
	pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	})
    return [pos.coords.latitude, pos.coords.longitude]
}