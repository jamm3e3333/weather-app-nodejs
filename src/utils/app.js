const request = require('request');
const geocode = require('./geocode.js');
const weather = require('./weather.js');
const args = process.argv[2].toString();


// request({url: url, json: true}, (error, response) => {
//     if(error){
//         console.log('Unable connecting to the weather service!');
//     }

//     else if(response.body.error){
//         console.log('Unable to find location!');
//     }

//     else{
//         const location = response.body.location;
//         const weather = response.body.current;
//         console.log(`${weather.weather_descriptions[0]} \nCity: ${location.name} \nCurrent temperature: ${weather.temperature} °C\nFeels like: ${weather.feelslike} °C`);
//     }
    
// })



// //Geocoding 
// //Address -> lat/long -> weather


// request({url: url_geo, json: true},(error,response) => {
//     const features = response.body.features[0];
    
//     if(error){
//         console.log('Connection interrupted.');
//     }
//     else if(!features.length){
//         console.log('Error in the URL.');
//     }
//     else{
//         const longitude = features.center[0];
//         const latitude = features.center[1];
//         console.log(`longitude: ${longitude}\nlattitude: ${latitude}`);
//     }
    
    
// })

if(args == ''){
    console.log('wrong argument');
    console.log(`The argument: ${args} is wrong`);
    console.log(typeof args);
}
else{
    geocode(args, (error, {longitude,latitude} = {}) => {
        if(error){
            console.log(error);
        }
        else{
            console.log(longitude,latitude);
            weather(latitude,longitude,(weatherError,weatherData) => {
                if(weatherError){
                    console.log(weatherError);
                }
                else{
                    console.log(weatherData);
                }
            });
        }
    });
}
