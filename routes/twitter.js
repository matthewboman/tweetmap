const express = require('express')
const router = express.Router()
const Promise = require('bluebird')

const Request = require('../utils/Request')
const Geo = require('../utils/Geo')

const zip = (arr, ...arrs) =>
  arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]))

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
        return [
          tweet,
          { lat: tweet.coordinates.coordinates[0],
            lng: tweet.coordinates.coordinates[1] }
        ]
    })

    const cityTweets = rawTweets.filter(tweet =>
      tweet.user.location != null
    )

    const newGeoTweets = yield Promise.map(cityTweets, (tweet) =>
      Geo.getLocation(tweet.user.location)
         .catch((err) => {})
    )

    const tweetsWithGeo = zip(cityTweets, newGeoTweets)
      .filter(pair => pair[1] != undefined)

    const allGeoTweets = geoTweets.concat(tweetsWithGeo)

    res.json({
      success: 'true',
      tweetLocations: allGeoTweets
    })
  })

  const tweetMapper = new TweetHandler()
  tweetMapper.getCoordinates(endpoint, params)

})

module.exports = router
