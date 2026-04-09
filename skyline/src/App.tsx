import { useQuery } from "@tanstack/react-query";
// import { getWeather } from "./api";
import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import Map from "./components/Map";
import { Suspense, useState } from "react";
import type { Coords } from "./types";
import { LocationDropdown } from "./components/dropdowns/LocationDropdown";
import { getGeoCode } from "./api";
import { MapTypeDropdown } from "./components/dropdowns/MapTypeDropDown";
import MapLegend from "./components/MapLegend";
import { CurrentSkeleton } from "./components/skeletons/CurrentSkeleton";
import { HourlySkeleton } from "./components/skeletons/HourlySkeleton";
import { DailySkeleton } from "./components/skeletons/DailySkeleton";
import { AdditionalInfoSkeleton } from "./components/skeletons/AdditionalInfoSkeleton";

function App() {
  const [ coordinates, setCoords ] = useState<Coords>({ lat: 49.2333, lon: 7.0 })
  const [ location, setLocation ] = useState('Saarbrücken')
  const [ mapType, setMapType ] = useState('tmp2m')

  const { data } = useQuery({
    queryKey : ['geocode', location],
    queryFn: () => getGeoCode(location),
    enabled: location !== 'custom'
  })

  const onMapClick = (lat:number, lon:number) => {
    setCoords({ lat, lon })
    setLocation('custom')
  }

  const coords =  location === 'custom'
    ? coordinates
    : data
    ? { lat: data.location.lat, lon: data.location.lon }
    : coordinates;

  return (
    <div className="dark flex flex-col gap-2">
      {/* <div>
        <h1 className="flex flex-col items-center justify-center p-2 rounded-xl bg-linear-to-br from-cyan-900/60 to-cyan-300/30 shadow-md gap-4 text-2xl">
          Skyline
        </h1>
      </div> */}
      
      <div className="dark flex gap-8 relative z-[1001] pt-2"> 
        <div className="flex gap-4 items-center mx-2">
          <h1 className="text-2xl font-semibold">Ort</h1>
          <LocationDropdown location={location} setLocation={setLocation}/>
        </div>
        <div className="flex gap-4 items-center">
          <h1 className="text-2xl font-semibold">Kartentyp</h1>
          <MapTypeDropdown mapType={mapType} setMapType={setMapType}/>
        </div>
      </div>
      
      <div className="relative z-0">
        <Map coords={coords} onMapClick={onMapClick} mapType={mapType}/>
        <MapLegend mapType={mapType}/>
      </div>
      
      <Suspense fallback={<CurrentSkeleton/>}>
        <CurrentWeather coords={coords}/>
      </Suspense>
      
      <Suspense fallback={<HourlySkeleton/>}>
        <HourlyForecast coords={coords}/>
      </Suspense>

      <Suspense fallback={<DailySkeleton/>}>
        <DailyForecast coords={coords}/>
      </Suspense>

      <Suspense fallback={<AdditionalInfoSkeleton/>}>
        <AdditionalInfo coords={coords}/>
      </Suspense>
      
    </div>
  )
}

export default App
