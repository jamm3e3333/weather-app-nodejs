//impoting modules
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const weather = require('./utils/weather.js');
const app = express();
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectory = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


//set up the local directory to serve
app.use(express.static(publicDirectory));
app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather app',
        place: 'VSB-TUO',
        name: 'Jakub Vala'
    });
});

//request for 
app.get('/about',(req,res) => {
    res.render('about',{
        title: 'Weather app',
        place: 'VSB-TUO',
        name: 'Jakub Vala'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Weather app',
        place: 'VSB-TUO',
        read: 'FAQ',
        name: 'Jakub Vala'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide address query!'
        });
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error){
            return res.send({
                error
            });
        }
        weather(latitude,longitude,(weatherError, weatherData = {}) => {
            if(weatherError){
                return res.send({
                    weatherError
                });
            }
            else{
                return res.send({
                    weather: weatherData,
                    location,
                    address: req.query.address
                });
            }
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
});

app.get('/help/*', (req,res) => {
    res.render('errorPage',{
        errMessage: 'Help extension wasn\'t found',
        title: '404',
        name: 'Jakub Vala',
        place: 'VSB-TUO'
    })
})

app.get('*', (req,res) => {
    res.render('errorPage',{
        errMessage: 'Page not found',
        title: '404',
        name: 'Jakub Vala',
        place: 'VSB-TUO'
    })
})

app.listen(port,() => {
    console.log(`Server is up on port ${port}`);
});

//app.com
//app.com/help
//app.com/about

