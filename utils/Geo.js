const GoogleMapsAPI = require('googlemaps')
const Promise = require('bluebird')

const publicConfig = {
  key: process.env.GOOGLE_MAP_API,
  stagger_time: 1000,
  encode_polylines: false,
  secure: true
}

module.exports = {

  /*
  Sends user's profile location to Google to get lat/lng
  */
  getLocation: function(city) {
    return new Promise(function(resolve, reject) {
      let gmAPI = new GoogleMapsAPI(publicConfig)
      let geocodeParams = {
        address: city,
        language: 'en'
      }

      gmAPI.geocode(geocodeParams, function(err, response) {
        if (err) {
          reject(err)
        }
        let place = response.results
        // verify we actually got a valid lat/lng back
        if(place[0]) {
          let latLng = place[0].geometry.location
          resolve(latLng)
        }
        resolve(null)
      })
    })
  },

}
