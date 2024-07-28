import axios from 'axios';
const apiKey = '1fe3c37c14a64b46b8a124320240907';
// const apiUrl = 'https://api.weatherapi.com/v1/current.json?'
const forecastUrl='https://api.weatherapi.com/v1/forecast.json?'

export  const Weather= async( city )=> {

    try {
        const {data} = await axios.get(forecastUrl + `key=${apiKey}&q=${city}&days=6&aqi=yes`)
        console.log(data)
        return data;
    } catch (error) {
        console.log(error.message);
    }
    // console.log(cityname)
}
