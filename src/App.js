import './index.css'
import { useState } from 'react'
import snow from './images/snow.png'
import defa from './images/kkk.png'
import cloud from './images/cloudy.png'
import sunny from './images/sunny.png'
import rain from './images/rain.png'
import axios from 'axios'

function App() {
  
  const [value, setValue] = useState("")

  const [weather, setWeather] = useState("")
  const [temp, setTemp] = useState("")
  const [des, setDes] = useState("")
  const [images, setImages] = useState(defa)
  const [emogis, setEmogis] = useState("")

  function getValue(evt) {
    setValue(evt.target.value)
  }
  
  function getWeather() {

    var weather = axios(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=d7bd0065bf191a147399ba0e0c5b85bf`)

    weather.then(function (itm) {
      console.log(itm.data.main);
      setWeather(itm.data.weather[0].main)
      setDes(itm.data.weather[0].description)
      setTemp(Math.round(itm.data.main.temp - 273)+"°C")

      if (itm.data.weather[0].main == "Clouds") {
        setImages(cloud)
        setEmogis("☁️")
      }
      else if (itm.data.weather[0].main == "Clear") {
        setImages(sunny)
        setEmogis("☀️")
      }
      else if (itm.data.weather[0].main == "Rain") {
        setImages(rain)
        setEmogis("☔")
      }
      else if (itm.data.weather[0].main == "Snow") {
        setImages(snow)
        setEmogis("☃️")
      }
      else{
        setImages(defa)
      }
    }).catch(function () {
      alert("Invalid Name")
      setValue("")
    })
    
    
  }


  return (
    <div style={{
      backgroundImage: `url(${images})`,
      backgroundSize: 'cover',
      height: '100vh',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '60px'
    }}>
      <div>
        <h1 className='text-4xl font-bold'>Weather Report</h1>
      </div>
      <div className='flex justify-center items-center flex-col gap-5'>
        <input onChange={getValue} value={value} className='p-1 border rounded-md' type='text'/>
        <button onClick={getWeather} className='py-1 px-8 border rounded-md some'>Get Report</button>
      </div>
      <div className='gap-6 flex flex-wrap justify-center '>
        <div className='w-48 h-32 bch flex flex-col justify-center items-center rounded-md'>
          <h1 className='text-2xl font-semibold'>Weather</h1>
          <p className='text-xl text-white'>{weather}</p>
          <p>{emogis} {emogis} {emogis}</p>
        </div>
        <div className='w-48 h-32 bch flex flex-col justify-center items-center rounded-md'>
          <h1 className='text-2xl font-semibold'>Temperature</h1>
          <p className='text-xl text-white'>{temp}</p>
        </div>
        <div className='w-48 h-32 bch flex flex-col justify-center items-center rounded-md'>
          <h1 className='text-2xl font-semibold'>Description</h1>
          <p className='text-xl text-white'>{des}</p>
          <p>{emogis}</p>
        </div>
      </div>
    
  </div>
  );
}

export default App;
