const searchBox = document.getElementById('search');

// render map
const map = new L.Map("map", {center: [37.8, -96.9], zoom: 2})
  .addLayer(new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"));

// get tweets and display map location
searchBox.addEventListener('submit',function(e) {
    e.preventDefault();
    let searchTerm = document.getElementById('searchTerm').value;
    let url = '/twitter/' + searchTerm

    d3.json(url, function(data) {
      let tweets = data.tweetLocations
      tweets.forEach(function(d) {
        L.marker(d).addTo(map)
      })
    })
});
