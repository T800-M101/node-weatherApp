const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const urlBase = 'http://api.weatherstack.com/current';
    const access_key = 'c1d9bdf517902c4e2ec1ae3a54f6268f';
    const lat = latitude;
    const ln = longitude;
    const location = `${lat},${ln}`;
    const units = 'm';
    const url = `${urlBase}?access_key=${access_key}&query=${location}&units=${units}`;

    request({ url, json:true}, (error, { body } = {}) => {
       if(error){
          callback('Unable to connect to weather service!', undefined);
       }else if(body.error){
          const err = body.error.info; 
          callback(err, undefined);
       }else {
        const weatherDescription = body.current.weather_descriptions[0]; 
        const city = body.location.name;
        const temperature = body.current.temperature;
        const feelslike = body.current.feelslike;
        callback(undefined, `${weatherDescription}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees.`);
       }
    })

};

module.exports = forecast;