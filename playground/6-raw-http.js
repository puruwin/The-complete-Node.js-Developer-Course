const http = require('http')

const url = 'http://api.weatherstack.com/current?access_key=4fa109becd811329cf52f7bd471d3a7c&query=0.1234,38.5412'

const request = http.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) => {
        data += chunk.toString()
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })

})

request.on('error', (error) => {
    console.log('An error', error)
})

request.end()