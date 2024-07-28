import React, { useEffect, useState } from 'react'
import locationimg from './image/gps.png'
import { Weather } from './Weather';
import axios from 'axios';

export default function Main() {



    //displaying time
    let a = new Date();
    useEffect(() => {

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        // let a1 = a.getDay();
        let date = a.toLocaleDateString(undefined, options);
        let time1 = a.getHours()
        let time2 = a.getMinutes()
        let time = time1 + ':' + time2
        console.log(date, time)
        setTime(date + ' | ' + time)
        setInterval(() => {
            setTime(date + ' | ' + time)
        }, 60000);
    }, [])


    const [time, setTime] = useState('')
    const [WeatherData, setWeatherData] = useState({})
    const [city, setCity] = useState('')
    const [dayForecast, setDayForecast] = useState([
        { date: '', date_epoch: '', day: {}, astro: {}, hour: [] },
        { date: '', date_epoch: '', day: {}, astro: {}, hour: [] },
        { date: '', date_epoch: '', day: {}, astro: {}, hour: [] },
        { date: '', date_epoch: '', day: {}, astro: {}, hour: [] }
    ])
    // const [dayForecast,setDayForecast]= useState({})
    // console.log()

    const [tempArray, setTempArray] = useState([])
    const [hourForecast, setHourForecast] = useState([])

    const search = async () => {

        try {
            console.log(city)
            const data = await Weather(city)
            setWeatherData((data))
            setDayForecast(data.forecast)
            setHourForecast(data.forecast.forecastday[0].hour)
            console.log('forecasthour', hourForecast)
            // console.log('forecasthour',data.forecast.forecastday[0].hour)
            console.log(WeatherData)
            console.log(dayForecast)
            setTempArray(dayForecast.forecastday)
            console.log('forecastArray', tempArray)
            // const tempArray=dayForecast.forecastday;
            for (let i = 0; i < tempArray.length; i++) {
                console.log(tempArray[i].day.condition.text)
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        search();
        console.log('useeffect running')
    }, [])

    const addLocation = async () => {
        if(WeatherData){
        const {name:cityname}=WeatherData.location;
        const {temp_c:temp}=WeatherData.current;
        const {wind_kph:wind}=WeatherData.current;
        const {humidity}=WeatherData.current;
        const {text:condition}=WeatherData.current.condition;
        console.log(cityname,temp,wind,humidity,condition)
        
        try {
            const res=await axios.post('http://localhost:3000/api/locations',{
                // WeatherData.current.temp_c,
                // WeatherData.current.humidity,
                // WeatherData.current.wind_kph,
                // WeatherData.location.name,
                // WeatherData.current.condition.text
                cityname,
                temp,
                wind,
                humidity,
                condition
            })
            console.log('Location added',res.data)
        } catch (error) {
            console.log(error)
            console.log('error occured')
        }
    }
        
    }



    if (!WeatherData || !WeatherData.location) {
        return <div className="input mb-3 borders my-4 d-flex justify-content-center">
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className='searchbar borders' placeholder='Enter City Name' />
            <button onClick={() => search()} className="btn btn-outline-light borders" type="button" >Search</button>
        </div>;
    }

    return (
        <div id='mainbox'>
            <div id='container'>

                <section className='box  py-4 borders' id='box1' >
                    <div className='d-flex justify-content-around'>
                        <div className="input mb-3 borders ">
                            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className='searchbar borders' />
                            <button onClick={() => search()} className="btn btn-outline-light borders mx-1" type="button" >Search</button>
                            <button onClick={ addLocation} className="btn btn-outline-light borders mx-1" type="button" >Add</button>
                        </div>
                        <div id='time' className='borders'>{time}</div>
                    </div>
                    <div id='weather' className='text borders '>{WeatherData.current.condition.text}</div>
                </section>



                <section className='box borders d-flex justify-content-center align-items-center scrollbar ' id='box2'>
                    {/* <div> */}
                    {(hourForecast).map((hour, index) => {
                        return (
                            <div key={index} className='hours d-flex flex-column borders justify-content-center mx-2'>
                                <p className='hourstime borders text-center'>{hour.time}</p>
                                <img src={locationimg} className='borders my-0' height='20px' width='20px' />
                                <p className='borders text-center  fs-5 fw-light'>{hour.temp_c}&deg;C</p>
                            </div>
                        );
                    })}
                    {/* </div> */}
                    {/* <div className='hours d-flex flex-column borders justify-content-center mx-2'>
                        <p className='hourstime borders text-center'>9:00</p>
                        <img src={locationimg} height='20px' width='20px' />
                        <p className='borders text-center my-2 fs-5 fw-bold'>9&deg;C</p>
                    </div> */}
                </section>




                <section className='box' id='box3'>
                    <div className='d-flex flex-column  justify-content-center'>
                        <div id='location' className='borders '><img src={locationimg} height='20px' width='20px' />&nbsp;&nbsp;&nbsp;{WeatherData.location.name}, {WeatherData.location.region} </div>
                        <div id='temperature' className='borders'>{WeatherData.current.temp_c}&deg;C</div>
                        <div id='wind' className='borders text-center'>Humidity: {WeatherData.current.humidity} , {WeatherData.current.wind_kph} km/h</div>
                    </div>
                    <div id="daysforecast" className='borders'>
                        <p className='text-center'>The Next Days Forecast</p>

                        <div id='dayscontainer ' className='scrollbar'>
                            {(dayForecast.forecastday).map((day, index) => {
                                return (
                                    <div className="days borders d-flex justify-content-between my-4" >
                                        <div key={index} className='borders d-flex' id={`sbox${index}`}>
                                            <span><img src={locationimg} height='20px' width='20px' /></span>
                                            <span className='mx-3'>
                                                <p className='my-0'>July {day.date}</p>
                                                <p className='my-0'>{day.day.condition.text}</p>
                                            </span>
                                        </div>
                                        <div className='borders'>
                                            <p className='my-0'> {day.day.mintemp_c}&deg;c</p>
                                            <p className='my-0'> {day.day.maxtemp_c}22&deg;c </p>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* <div className="days borders d-flex justify-content-between">
                                <div className='borders d-flex' id='sbox'>
                                    <span><img src={locationimg} height='20px' width='20px' /></span>
                                    <span className='mx-3'>
                                        <p className='my-0'>Friday,April 21</p>
                                        <p className='my-0'>Heavy rain</p>
                                    </span>
                                </div>
                                <div className='borders'>
                                    <p className='my-0'> 9&deg; </p>
                                    <p className='my-0'> 22&deg; </p>
                                </div>
                            </div> */}
                            {/* <div className="days borders d-flex justify-content-between">
                                <div className='borders d-flex' id='sbox'>
                                    <span><img src={locationimg} height='20px' width='20px' /></span>
                                    <span className='mx-3'>
                                        <p className='my-0'>Friday,April 21</p>
                                        <p className='my-0 font-weight-bold'>Heavy rain</p>
                                    </span>
                                </div>
                                <div className='borders'>
                                    <p className='my-0'> 9&deg; </p>
                                    <p className='my-0'> 22&deg; </p>
                                </div>
                            </div> */}
                            {/* <div className="days border"></div> */}
                        </div>
                    </div>
                </section>
            </div>
            

        </div>
    )
}
