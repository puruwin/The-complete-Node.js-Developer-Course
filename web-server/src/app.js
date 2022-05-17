const path = require('path')
const express = require('express')
const hbs = require('hbs')

const request = require('request')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


// Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'David Perez'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'David Perez'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'We are sending help!',
        name: 'David Perez'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send( {
            error: 'You must provide an address.'
        })
    }

    res.send({
        address: req.query.address
    })
    // const url = 'http://api.weatherstack.com/current?access_key=4fa109becd811329cf52f7bd471d3a7c&query=38.5412,0.1234'
    // request({ url, json: true }, (error, { body }) => {
    //     if (error) {
    //         res.send('Unable to connect to weather services.')
    //     } else if (body.error) {
    //         res.send('Unable to find location')
    //     } else {
    //         res.send({
    //             location: {
    //                 city: body.location.name,
    //                 country: body.location.country
    //             },
    //             forecast: {
    //                 description: body.current.weather_descriptions[0],
    //                 temperature: body.current.temperature,
    //                 feelslike: body.current.feelslike
    //             }
    //         })
    //     }
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send( {
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404help', {
        title: '404',
        message: 'Help page not found',
        name: 'David Perez'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'David Perez'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})