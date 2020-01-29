const path = require('path')
const hbs = require('hbs')
const express = require('../node_modules/express')
const app = express()
const Utils = require('../src/Utils')
const validator = require('../node_modules/validator')
const port = process.env.PORT || 3000 //hosting server will provide port or use default 3000
//app.com
//app.com/help
//app.com/about
console.log(__dirname)
console.log(path.join(__dirname, '../views')) 
//define path for express. 
const public = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')
//download and install npm i hbs (handle bar)
app.set('views', viewsPath) //need to set the views path
hbs.registerPartials(partialsPath) // need to set the partials path
app.set('view engine', 'hbs')
//set up static dicrector for other files such as html, css, js
app.use(express.static(public))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        name: 'Thien Nguyen'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Thien Nguyen',
        email: 'titien104@yahoo.com'
    })
})

// app.get('/about', (req, res) => {
//     res.send('<title> Tim Express </title><h1> About </h1>')
// })
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Thien (Tim) Nguyen',
        timpic: "/img/Tim.jpg",
        name: 'Thien Nguyen'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address provide.',
            help: 'Enter your address follow: /weather?address=your address'
        })
    }      
    const address = req.query.address
    if (validator.isIn(address, ['!', ' ', '.', '?', '%', '`', '"', '@', '#', '$', '&', '*', '+', '-'])){
        console.log("invalid address " + address)
        return res.send({error: 'Invalid address'})
    }
    Utils.geoCode(address, (error, data = {}) => {
        if (error) {
            res.send({error: 'Can not find address'})
        }
        const coordinate = data.lat + ',' + data.long
        Utils.getWeather(coordinate, (error, weather) => {
            if (error) {
                return res.send({error: 'Can not find weather data'})
            }
            const summary = weather.daily.summary + 
                ', Current Temperature: ' + weather.currently.temperature +
                ', with ' + weather.currently.precipProbability *100 + '% of rain'
            const currently = weather.currently.summary +
                ', Windspeed: ' + weather.currently.windSpeed +
                ', with uvIndex: ' + weather.currently.uvIndex
            res.send({
                title: 'Weather Page',
                name: 'Thien Nguyen',
                error: error,
                address: address,
                Currently: currently,
                Summary: summary,
                Temp: weather.currently.temperature,
                Precip: weather.currently.precipProbability
            })
        })
    })
})

app.get('/TestAPI', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'No address provide for search'
        })
    } else {
        const address = req.query.address
        res.send({
            title: 'Test API',
            name: 'Thien Nguyen',
            address: address
        })

    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help page is not found',
        name: 'Thien Nguyen'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page is not found',
        name: 'Thien Nguyen'
    })
})


app.listen(port, () => {
    console.log('Express Server is up at port ' + port)
})
