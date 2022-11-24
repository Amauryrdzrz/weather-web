const request = require('request')

const weather = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fc29779579a78582adb25b47d2c9a98d&query=' + encodeURIComponent(longitude) +
        ',' + encodeURIComponent(latitude)
    console.log(url)
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to location services', undefined)
        } else if (body.success == 'false') {
            callback('Unable to find location. Try another search', undefined)
        } else {
            console.log(body)
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                description: body.current.weather_descriptions[0],
                precipitation: body.current.precip
            })
        }
    })
}

module.exports = weather