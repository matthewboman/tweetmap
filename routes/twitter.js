const express = require('express')
const router = express.Router()
const Twitter = require('twitter')
const Promise = require('bluebird')

const Request = require('../utils/Request')
const Geo = require('../utils/Geo')

router.get('/:term/:count', (req, res, next) => {
  const endpoint = 'search/tweets'
  const params = {
      q: req.params.term,
      count: req.params.count,
      result_type: 'recent'
    }

  function TweetHandler () {}

  TweetHandler.prototype.getCoordinates = Promise.coroutine(function* () {
    const rawTweets = yield Request.getTweets(endpoint, params)
      .then(results => results.statuses)
      .catch(err => { console.log(err) })

    const geoTweets = rawTweets.filter(tweet => (tweet.coordinates != null) )
      .map((tweet)=> {
        return {
          lat: tweet.coordinates.coordinates[0],
          lng: tweet.coordinates.coordinates[1]
        }
    })

    const cityTweets = rawTweets.filter(tweet =>
      tweet.user.location != null
    )

    const newGeoTweets = yield Promise.map(cityTweets, (tweet) => {
      return Geo.getLocation(tweet.user.location)
        .catch((err) => {})
    }).filter(latLng => latLng != null)

    const allGeoTweets = geoTweets.concat(newGeoTweets)

    res.json({
      success: 'true',
      tweetLocations: allGeoTweets
    })
  })

  const tweetMapper = new TweetHandler()
  tweetMapper.getCoordinates(endpoint, params)

})

module.exports = router
