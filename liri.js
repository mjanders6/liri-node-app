require('dotenv').config()
const keys = require('./keys.js')
const [ , , request, search] = process.argv

const spotify = new spotify(keys.spotify)

switch (request) {
    case 'concert-this':

        break
    case 'spotify-this-song':

        break

    case 'movie-this':

        break

    case 'do-what-it-says':

        break

    default:
        break
}