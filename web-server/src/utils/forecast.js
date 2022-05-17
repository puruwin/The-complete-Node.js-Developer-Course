const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4fa109becd811329cf52f7bd471d3a7c&query=' + longitude + ',' + latitude

    request({ url, json:true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services.', undefined)
        } else if (body.error) {
            console.log(body.error)
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + '. It feels like ' + body.current.feelslike + '.')
        }
    })
}

module.exports = forecast