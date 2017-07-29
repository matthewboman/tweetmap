const GoogleMapsAPI = require('googlemaps')
const Promise = require('bluebird')

const publicConfig = {
  key: process.env.GOOGLE_MAP_API,
  stagger_time: 1000,
  encode_polylines: false,
  secure: true
}

module.exports = {

  getLocation: (city) => {
    return new Promise((resolve, reject) => {
      const gmAPI = new GoogleMapsAPI(publicConfig)
      const geocodeParams = {
        address: city,
        language: 'en'
      }

      gmAPI.geocode(geocodeParams, (err, response) => {
        if (err) {
          reject(err)
        }

        if (response.results[0]) {
          const latLng = response.results[0].geometry.location
          resolve(latLng)
        }
        resolve(null)
      })
    })
  },

}
