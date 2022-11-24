const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000
    //define paths for express config
const publicDP = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDP))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Amaury Rodríguez'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Amaury Rodríguez'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        text: 'This is a help message for everyone',
        name: 'Amaury Rodríguez'
    })
})

app.get('/help/*', (req, res) => {
    res.render('e404', {
        title: 'Help Page',
        text: 'Help article not found',
        name: 'Amaury Rodríguez'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address provided'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }

            weather(longitude, latitude, (error, {
                temperature,
                feelslike
            }) => {
                if (error) {
                    return res.send({ error })
                }

                res.send({
                    clima: [temperature, feelslike],
                    location,
                    address: req.query.address
                })
            })
        })
        // res.send({
        //     forecast: req.body.,
        //     location: 'Torreón Coahuila México',
        //     address: req.query.address
        // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })

})

app.get('*', (req, res) => {
    res.render('e404', {
        title: 'Error Page',
        text: 'Non valid page, please return',
        name: 'Amaury Rodríguez'
    })
})

app.listen(port, () => {
    console.log('Server is up in port ' + port)
})