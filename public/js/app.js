console.log('client side javascript message printed!');
const search = document.querySelector('.txtCity');
const weatherForm = document.querySelector('form');
const loc = document.querySelector('#location');
const weatherMsg = document.querySelector('#weatherMsg');

weatherForm.addEventListener('submit', (e) => {
    const location = search.value;
    loc.textContent = 'Loading...';
    weatherMsg.textContent = '';
    
    e.preventDefault();    
    if(!location){
        loc.textContent = 'Add the location.';
    }
    else{
        getData(`/weather?address=${location}`)
        .then(({weather, location, address}) => {
            loc.innerHTML = `Weather in ${location}:`;
            weatherMsg.innerText = `Local time: ${weather.location.localtime.substr(11,16)}\nTemperature: ${weather.current.temperature} °C\nFeels like: ${weather.current.feelslike} °C\n${weather.current.weather_descriptions[0]}\nPressure: ${weather.current.pressure} hPa`;
        })
        .catch((err) => {
            loc.textContent = 'Error getting the location.';
            weatherMsg.textContent = err;
        });
    }
});

const getData = async(resource) => {
    const response = await fetch(resource);
    if(response.status !== 200){
        throw Error('Data not fetched');
    }
    const dataCity = await response.json();
    return dataCity;
}