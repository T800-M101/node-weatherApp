const request = require('request');
const geoCode = ( address, callback ) => {

    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    const location = encodeURIComponent(address);
    const access_key = 'pk.eyJ1IjoibWVtb21vcmFuIiwiYSI6ImNrbjduZTA0OTBlcjIyb2xuMHJma2Jwa2oifQ.PNtv7JJcJXH-z2QfbFGoLA';
    const limit = '1';
    const url = `${geoCodeUrl}${location}.json?access_token=${access_key}&limit=${limit}`;

    request({ url, json:true }, (error, { body }= {}) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        }else if(body.features.length === 0){
            callback('Uneable to find location. Try another search!', undefined)
        }else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    })
}

module.exports = geoCode;
