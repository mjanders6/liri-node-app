require('dotenv').config()
var keys = require('./keys.js')
var Spotify = require('node-spotify-api');
var [, , request, ...search] = process.argv

var spotify = new Spotify(keys.spotify)

// spotify
//   .search({ type: 'track', query: search.join(' ')})
//   .then(r => {
//     let trackSearch = r.tracks.items
    
//     //   console.log(r.tracks.items[0].album.artists[0].name);
//       // console.log(r.tracks.items[0].name)
//     trackSearch.forEach((trck, i) => {
//         console.log(`
//           Artist: ${r.tracks.items[i].album.artists[0].name}
//           Song Name: ${r.tracks.items[i].name}
//           Preview Link: ${r.tracks.items[i].album.external_urls.spotify}
//           Album: ${r.tracks.items[i].album.name}
//         `);
//       })
//   })    
//   .catch(function(err) {
//     console.log(err);
//   });

switch (request) {
  case 'concert-this':

    break

  case 'spotify-this-song':
    var spotify = new Spotify(keys.spotify)

    spotify
      .search({ type: 'track', query: search.join(' ')})
      .then(r => {
        let trackSearch = r.tracks.items
        //   console.log(r.tracks.items[0].album.artists[0].name);
        // console.log(r.tracks.items[0].name)
        trackSearch.forEach((trck, i) => {
          console.log(`
              Artist: ${r.tracks.items[i].album.artists[0].name}
              Song Name: ${r.tracks.items[i].name}
              Preview Link: ${r.tracks.items[i].album.external_urls.spotify}
              Album: ${r.tracks.items[i].album.name}
            `);
        })
      })
      .catch(function (err) {
        console.log(err);
      });
    break

  case 'movie-this':

    break

  case 'do-what-it-says':

    break

  default:
    break
}