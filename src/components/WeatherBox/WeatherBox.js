import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useCallback, useState } from 'react';

const WeatherBox = props => {
  const [weatherData, setWeatherData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback(city => {
    setLoading(true);
    setError(false);

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=486edcc1e24e1fa826cc400ac4bb21f0&units=metric`)
   .then(res => {
    if(res.status === 200) {
    return res.json()
   .then(data => {
     console.log(data);
     const weatherData = {
      city: data.name,
      temp: data.main.temp,
      icon: data.weather[0].icon,
      description: data.weather[0].main
};

setWeatherData(weatherData);
setLoading(false);
   });
   } else {
    setError(true);
   }
  });
  }, [])

  

  return (
    <section>
      <PickCity action={handleCityChange} />
      {weatherData && !loading && <WeatherSummary weatherData={weatherData}/>}
      {loading && !error && <Loader />}
      {error && <ErrorBox >There is no such city!</ErrorBox>}
    </section>
  )
};

export default WeatherBox;