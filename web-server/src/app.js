const path = require('path')
const express = require('express')

const request = require('request')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

app.get('/weather', (req, res) => {
    const url = 'http://api.weatherstack.com/current?access_key=4fa109becd811329cf52f7bd471d3a7c&query=38.5412,0.1234'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            res.send('Unable to connect to weather services.')
        } else if (body.error) {
            res.send('Unable to find location')
        } else {
            res.send({
                location: {
                    city: body.location.name,
                    country: body.location.country
                },
                forecast: {
                    description: body.current.weather_descriptions[0],
                    temperature: body.current.temperature,
                    feelslike: body.current.feelslike
                }
            })
        }
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})