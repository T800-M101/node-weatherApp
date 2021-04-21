const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode  = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();


// Define paths for Express config
const publicStaticPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');


// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// Using the method 'static' to serve a static file
app.use(express.static(publicStaticPath));





app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Index Guillermo Moran'
    });
});


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Helping...',
        name: 'Help Guillermo Moran'
    });
});


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Know my dog',
        name: 'About Guillermo Moran'
    });
});


app.get('/weather', (req, res) => {

    if(!req.query.address){
       return res.send({
            error: 'You must provide an address!'
        });
    }

    const address = req.query.address;
    geoCode(address, ( error, {latitude, longitude, location } = {} ) => {
     
         if(error){
             return res.send({
                 error
             });
              
         }
         forecast(latitude, longitude, (error, forecastData) => {
                 if(error){
                     return res.send({
                         error
                     });
                 }

                 res.send({
                    forecast:forecastData,
                    location,
                    address
                });
               
               });
         });
   
    
    
});
































app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name:'Guillermo Moran',
        error: 'Help article not found!'
    });
});


app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name:'Guillermo Moran',
        error: 'Page not found'
    });
});


// Setting the server up
app.listen(3000, () => {
    console.log('Server is up on port 3000...');
});



