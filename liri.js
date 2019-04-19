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
  .search({ type: 'track', query: 'All the Small Things'})
  .then(r => {
    let trackSearch = r.tracks.items
    //   console.log(r.tracks.items[0].album.artists[0].name);
    //   console.log(r.tracks.items);
    trackSearch.forEach((trck, i) => {
        console.log(r.tracks.items[i].album.artists[0].name);
        
    })

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