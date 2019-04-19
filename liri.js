require('dotenv').config()
var keys = require('./keys.js')
var Spotify = require('node-spotify-api');
var [, , request, search] = process.argv

var spotify = new Spotify(keys.spotify)

 
// var spotify = new Spotify({
//   id: '',
//   secret: ''
// });
 
spotify
  .search({ type: 'track', query: 'All the Small Things', limit:1})
  .then(r => {
      console.log(r.tracks.items[0].album.artists[0].name);
    //   console.log(r.tracks.items.length);
  })    
  .catch(function(err) {
    console.log(err);
  });

// switch (request) {
//     case 'concert-this':

//         break

//     case 'spotify-this-song':

//         break

//     case 'movie-this':

//         break

//     case 'do-what-it-says':

//         break

//     default:
//         break
// }