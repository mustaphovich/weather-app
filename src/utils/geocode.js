const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+ '.json?access_token=pk.eyJ1Ijoic3RldmVtYWxhc3MiLCJhIjoiY2wzc3dxZzdxMDM2aTNjcXFmOW05Y2I3eiJ9.lc2MR9gu6L1OpKgU0bVOXw&limit=1'

    request({url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode