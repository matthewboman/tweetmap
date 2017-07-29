# Tweetmap

[Demo Site](https://arcane-sands-45470.herokuapp.com/)

Tweetmap displays the location of recent tweets containing any given search term. If a Twitter user has geolocation enabled, it maps their current location. If they don't, it uses their city to get coordinates from Google. Often, the user's location isn't something searchable (because who would make that information public?), so the returned number will often be less than the number selected.

## Contributing

Tweetmap is a work in progress. Some features I'm hoping to develop include:

    - managing state to show/hide the heatmap and/or markers
    - returning tweets as objects (for linking to profile and displaying tweet)  

## Running locally

    git clone https://github.com/crashspringfield/tweetmap.git
    npm install
    create .env file with Twitter and Google API keys
    npm start
