# Tweetmap
Tweetmap displays the location of the past ~100 tweets containing any given search term. Because most users don't have geolocation enabled, /Geo.js sends the user's registered location to Google's map API to get a valid lat/lng.

Tweetmap is a work in progress. Some features I'm hoping to develop include:
  - use D3 to build a heatmap to display where searched term is more/less popular
  - allow users to click on icon to display tweet w/ link to profile
  - create option for displaying latest X number of tweets (and a backend method to make multiple requests to get around Twitter's 100 tweet limit)
  
  
## Running locally

    git clone https://github.com/crashspringfield/tweetmap.git
    npm install
    create .env file with Twitter and Google API keys
    nodemon || node app
