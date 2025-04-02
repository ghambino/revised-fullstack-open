import React, {useState, useEffect} from 'react';
import axios from 'axios';


function CountryDetails({country}) {
  const {name, capital, population, languages, flag} = country
  const [weatherDetails, setWeatherDetails] = useState({}); 
  
  
  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=3604f787a2255ddbe4baf2b59d7de95e&query=${capital}`).then((response) =>{
     console.log(response.data) 
    let current_data = response.data.current;
      // const {temperature, weather_icons, wind_speed, wind_dir} = current_data;
      console.log(current_data);
      setWeatherDetails(current_data)
    }).catch(error => console.log(error.message))
  },[capital])

  return (
    <div>
      <h2>{name}</h2>
            <p key={capital}>Capital: {capital}</p>
            <p>Population:  {population}</p>
            <h2>languages</h2>
            {languages.map((lang,key) => <li key={key}>{lang.name}</li>)}
            <img src={flag} style={{width:160, height: 180}} alt='flag'/>

            <h2>Weather at {capital}</h2>
            <p><b>Temperature</b>: {weatherDetails.temperature} celsius</p>
            <img src={weatherDetails.weather_icons} alt='map'/>
           
           <p><b>wind:</b>{weatherDetails.wind_degree} mph, direction: {weatherDetails.wind_dir}</p>
            <p><b>weather observation time:</b>  {weatherDetails.observation_time}</p>
    </div>
  )
}



function App() {
  const [countries, setCountries] = useState([]);
  const [filterWord, setFilterWord] = useState('');
  const [country, setCountry] = useState({});

  useEffect(() => {
    axios.get(`https://restcountries.eu/rest/v2/name/${filterWord}`).then((response) => {
      let data = response.data;
      console.log(data);
      setCountries(data);
    }).catch(error => console.log(error.message));
  }, [filterWord])

  // const filterArray = (filterWord.length !== 0) ? countries.filter(country => country.name.toLowerCase().includes(filterWord.toLowerCase())) : []; 
  // console.log(filterArray);

  const handleButtonClick = (country) => {
      setCountry(country) 
  } 

  return (
    <div>
      <div>
        find countries: <input value={filterWord} onChange={(e) => setFilterWord(e.target.value)}/>
      </div>

      <div>
        {(countries.length > 10) && "Too much Matches, specify your filter"}
        {(countries.length < 10 && countries.length !== 1) && countries.map((country, index) => {
          return (
            <>
            <li key={index}>{country.name}</li>
            <button onClick={() => handleButtonClick(country)}>show Details</button>
            </>
          )})}
          {countries.length === 1 && countries.map((country) => <CountryDetails country={country}/>)}
        {(country.languages !== undefined) && <CountryDetails country={country}/>}
      </div>
    </div>
  );
}

export default App;
