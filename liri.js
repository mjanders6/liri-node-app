require('dotenv').config()
const keys = require('./keys.js')
const Spotify = require('node-spotify-api');
const axios = require('axios')
const fs = require('fs')
const moment = require('moment')

var [, , request, ...search] = process.argv

var spotify = new Spotify(keys.spotify)

let bandsTour = (goLook) => {
  axios.get(`https://rest.bandsintown.com/artists/${goLook.join(' ')}/events?app_id=codingbootcamp&date=upcoming`)
    .then(({ data }) => {
      // console.log(data[0]);
      // console.log(data[0].datetime);
      // let date = data[0].datetime.split('T')[0]
      // let time = data[0].datetime.split('T')[1]

      // let testDate = moment(data[0].datetime).format("MMMM Do, YYYY")
      // let testTime = moment(data[0].datetime).format("LT")

      data.forEach((items, i) => {
        let date = moment(items.datetime).format("MMMM Do, YYYY")
        let time = moment(items.datetime).format("LT")
        console.log(`
          Venue: ${items.venue.name}
          Location: ${items.venue.city}, ${items.venue.region}
          Time: ${date} at ${time}
        `)
      })
    })
    .catch(e => console.log(e))
}


let spotSearch = (goLook) => {
  var spotify = new Spotify(keys.spotify)

  let searchTerm = _ => {
    if (goLook.join(' ').length < 1) {
      // let search = 'the room'
      // console.log(search);
      return 'the room'
    } else {
      // let search1 = goLook.join(' ')
      // console.log(search1);
      return goLook.join(' ')
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
}

let spotMovie = (goLook) => {

  let movieSearch = _ => {

    if (goLook.join(' ').length < 1) {
      // console.log('Mr. Nobody')
      return 'Mr. Nobody'
    } else {
      // console.log(goLook.join(' '));
      return goLook.join(' ')
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
}

const arrFun = (data) => {
  let arry = []
  let bestArry = data.split(', ')
  bestArry.forEach((item, i) => {
    // console.log(`${item}`)
    arry.push(item)
  })
  // console.log( arry[1].slice(1, arry[1].length - 1) )  
}

fs.readFile('random.txt', 'UTF8', (e, data) => {
  if (e) {
    console.log(e)
  } else {
    arrFun(data)

  }
})

switch (request) {
  case 'concert-this':
    bandsTour(search)

    break

  case 'spotify-this-song':
    spotSearch(search)

    break

  case 'movie-this':
    spotMovie(search)

    break

  case 'do-what-it-says':

    break

  default:
    break
}