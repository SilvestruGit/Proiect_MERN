const axios = require('axios');

const API_KEY = 'AIzaSyDlvIrc1w-hyaXel3VzYdisAZ50py9v3V0';

const getCoords = async (address) => {
    const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`);

    // console.log(res.data.results[0].geometry['location']);
    return res.data.results[0].geometry['location'];
}

module.exports = getCoords;