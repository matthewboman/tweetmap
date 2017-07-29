const heatOptions = {
  minOpacity: .01,
  maxZoom: 8,
  max: 1.0,
  radius: 50,
  blur: 50,
  // gradient: ?
}
const searchBox = document.getElementById('search')
let map = new L.Map("map", {center: [37.8, -96.9], zoom: 2})
  .addLayer(new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"))

searchBox.addEventListener('submit', (e) => {

  e.preventDefault()
  map.eachLayer((layer) => {
    map.removeLayer(layer)
  })
  map.addLayer(new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"))

  const searchTerm = document.getElementById('searchTerm').value
  const numberOfTweets = document.getElementById('numberOfTweets').value
  const url = `/twitter/${searchTerm}/${numberOfTweets}`

  d3.json(url, (res) => {
    const tweets = res.tweetLocations
    if (document.getElementById('showMarkers').checked) {
      tweets.forEach((m) => {
        L.marker(m).addTo(map)
      })
    }

    /* convert object to array: [lat, lng, intensity] */
    const tweetsWithIntensity = tweets.map((tweet) => {
      return [].concat(tweet.lat, tweet.lng, 5)
    })
    if (document.getElementById('showHeatmap').checked) {
      heat = L.heatLayer(tweetsWithIntensity, heatOptions).addTo(map)
    }
  })

})
