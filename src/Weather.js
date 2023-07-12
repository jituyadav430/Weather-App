import React, { useState,useEffect } from 'react';
import axios from 'axios';

function Weather() {

  const [city,setCity]=useState();
  const [data,setData]=useState({})
  //use api key which is generated in weather open api 
  const apiKey="2852cd2098c80b8df34629988e8c933c"
  const [flag,setFlag]=useState(true);
  const [x,setX]=useState(true);

  function searchWeather(cityName){
    if(city!==''){
      // access the api here
        const apiURL="https://api.openweathermap.org/data/2.5/weather?q=" +cityName+ "&appid=" + apiKey;
    axios.get(apiURL).then((res)=>{
        console.log(res.data)
        setData(res.data)
        setCity('');
        setFlag(true);
    }).catch((err)=>{
        console.log(err);
        setFlag(false);
    })
      setX(true);
    }else{
        setX(false);
    }
  }
  useEffect(()=>{
    searchWeather("Gwalior");
  },[])
// search city function
  function search(){
      const newCity=city;
      searchWeather(newCity);
      
  }

  return (
   <>
     <h1 style={{color:"white"}}>weather app</h1>
     <br/><br/>
     <div>
        <h3 style={{color:"white"}}>Search City:</h3>
        <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} style={{color:"black",border:"none", outline:"none",borderBottom:"2px solid black"}}  />
        <button onClick={search} style={{color:"black"}}>search</button>
     </div><br/><br/>
     <div>
      {
        x?(
            <>
             {
                flag?(
                   <>
                    <h3 style={{color:"white"}}>{data?.name}</h3>
                    <h4 style={{color:"white"}}>{((data?.main?.temp)-273.15).toFixed(2)}°C</h4>
                   </>
                ) : (
                    <h5 style={{color:"white"}}>City Not Found</h5>
                )
               }
            </>
        ) :(
            <>
            <h4 style={{color:"white"}}>Enter City Name</h4>
            </>
        )
      }
     </div>
   </>
  )
}

export default Weather