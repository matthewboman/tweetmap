const express = require('express');
const router = express.Router();
const Twitter = require('twitter');
const Promise = require('bluebird');

const Request = require('../utils/Request')
const Geo = require('../utils/Geo')

router.get('/:term', function(req, res, next) {
  let searchTerm = req.params.term
  let endpoint = 'search/tweets';
  let  params = {
      q: searchTerm,
      count: 100,
      result_type: 'recent'
    }

  let geoTweets = [];
  let cityTweets = [];

  Request.getTweets(endpoint, params)
    .then(function(results) {
      let tweets = results.statuses;
      // console.log(tweets)
      for (let i = 0; i < tweets.length; i++) {
        if (tweets[i].coordinates != null) {
          geoTweets.push(tweets[i].coordinates.coordinates)
        } else if (tweets[i].user.location) {
          cityTweets.push(tweets[i].user.location)
        } else {
          // console.log('User hasn't enabled location')
        }
      }
    })
    // .then(function() {
    //   console.log('geo shit is ' + geoTweets);
    //   console.log('city shit is ' + cityTweets);
    // })
    .then(function() {
      let counter = 0
      for (let i = 0; i < cityTweets.length; i++) {
        Geo.getLocation(cityTweets[i])
          .then(function(latLng) {
            counter += 1
            if (latLng != null) {
              geoTweets.push(latLng)
            }
            // if all tweets with city have been processed, send response
            if (counter == cityTweets.length - 1) {
              res.json({
                success: 'true',
                tweetLocations: geoTweets
              })
            }
          })
          .catch(function(err) {
            // do nothing because lots of TypeErrors will happen with bullshit locations
          })
      }
    })
    .catch(function(err) {
      console.log(err)
    })

  return;

})

module.exports = router;
