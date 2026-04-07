import { useQuery } from "@tanstack/react-query";
// import { getWeather } from "./api";
import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import Map from "./components/Map";
import { useState } from "react";
import type { Coords } from "./types";
import { LocationDropdown } from "./components/dropdowns/LocationDropdown";
import { getGeoCode } from "./api";

function App() {
  const [ coordinates, setCoords ] = useState<Coords>({ lat: 49.2333, lon: 7.0 })
  const [ location, setLocation ] = useState('Saarbrücken')

  const { data } = useQuery({
    queryKey : ['geocode', location],
    queryFn: () => getGeoCode(location),
    enabled: location !== 'custom'
  })

  const onMapClick = (lat:number, lon:number) => {
    setCoords({ lat, lon })
    setLocation('custom')
  }
  
  // const coords = location === 'customised' ? coordinates : {lat: data?.location.lat ?? 49.2333, lon: data?.location.lon ?? 7.0}

  const coords =  location === 'custom'
    ? coordinates
    : data
    ? { lat: data.location.lat, lon: data.location.lon }
    : coordinates;

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h1 className="flex flex-col items-center justify-center p-2 rounded-xl bg-linear-to-br from-cyan-900/60 to-cyan-300/30 shadow-md gap-4 text-2xl">
          Skyline
        </h1>
      </div>
      <div className="relative z-[1001]"> 
        <LocationDropdown location={location} setLocation={setLocation}/>
      </div>
      <div className="relative z-0">
        <Map coords={coords} onMapClick={onMapClick}/>
      </div>
      {/* <LocationDropdown />
      <Map coords={coords} onMapClick={onMapClick}/> */}
      <CurrentWeather coords={coords}/>
      <HourlyForecast coords={coords}/>
      <DailyForecast coords={coords}/>
      <AdditionalInfo coords={coords}/>
    </div>
  )
}

export default App
