require('dotenv').config()
var keys = require('./keys.js')
var Spotify = require('node-spotify-api');
const axios = require('axios')
var [, , request, ...search] = process.argv

var spotify = new Spotify(keys.spotify)

switch (request) {
  case 'concert-this':
    // axios.get(`https://rest.bandsintown.com/artists/${search.join(' ')}/events?app_id=codingbootcamp&date=upcoming`)
    // .then(response => {
    //   console.log(response);

    // })
    // .catch(e => console.log(e))
    break

  case 'spotify-this-song':
    var spotify = new Spotify(keys.spotify)

    let searchTerm = _ => {
      if (search.join(' ').length < 1) {
        let search = 'the room'
        return search
      } else {
        let search1 = search.join(' ')
        return search1
      }
    }

    spotify
      .search({ type: 'track', query: searchTerm(), limit: 5 })
      .then(r => {
        let trackSearch = r.tracks.items

        trackSearch.forEach((trck, i) => {

          console.log(`
              Artist: ${trck.album.artists[0].name}
              Song Name: ${trck.name}
              Preview Link: ${trck.album.external_urls.spotify}
              Album: ${trck.album.name}
            `);
        })
      })
      .catch(function (err) {
        console.log(err);
      });
    break

  case 'movie-this':

    let movieSearch = _ => {
      if (search.join(' ').length < 1) {
        let search = 'Mr. Nobody'
        return search
      } else {
        let search1 = search.join(' ')
        return search1
      }
    }

    axios.get(`http://www.omdbapi.com/?t=${movieSearch()}&apikey=f8894189`)
      .then(({ data }) => {
        // console.log(data)
        let { Title, Year, imdbRating, Ratings, Country, Language, Plot, Actors } = data
        console.log(`
          Title: ${Title}
          Year: ${Year}
          imdb Rating: ${imdbRating}
          Rotten Tomatoes: ${Ratings[1].Value}
          Country: ${Country}
          Language: ${Language}
          Plot: ${Plot}
          Actors: ${Actors}
        `)
      })
      .catch(e => console.log(e))
    break

  case 'do-what-it-says':

    break

  default:
    break
}