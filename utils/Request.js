const Twitter = require('twitter')
const Promise = require('bluebird')

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

module.exports = {

  getTweets: (endpoint, params) => {
    return new Promise((resolve, reject) => {
      client.get(endpoint, params, (error, tweets, response) => {
        if (error) {
          reject(error)
        }
        resolve(tweets)
      })
    })
  },

}
