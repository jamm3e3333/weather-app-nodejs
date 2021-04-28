const dotenv = require('dotenv');
const path = require('path');
const request = require('request');
const fs = require('fs');
dotenv.config({
    path: path.join(__dirname, '../.env')
})

weather = (latitude,longitude, cb ) => {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.API_KEY_WEATHER}&query=${latitude},${longitude}`;
    request({url, json:true}, (error,{body}) => {
        if(error){
            cb('Connection interrupted',undefined);
        }
        else if(body.error){
            cb('The location doesn\'t exist!');
        }
        else{
            const bodyJSON = JSON.stringify(body);
            fs.writeFileSync('weather.json',bodyJSON);
            cb(undefined,body);
        }
    });
}

module.exports = weather;
