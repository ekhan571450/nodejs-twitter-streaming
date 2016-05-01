var Twitter = require('twitter');
const NodeCouchDb = require('node-couchdb');

const couch = new NodeCouchDb({
  host: '', 
  protocol: 'http',
  port: 5984
});
var database = "tweets";

var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

client.stream('statuses/filter', {locations: '144.3945,-38.2607,145.7647,-37.4598'}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.id);
    tweet._id = tweet.id_str;
    couch.insert(database, tweet);
  });
  stream.on('error', function(error) {
    throw error;
  });
});
