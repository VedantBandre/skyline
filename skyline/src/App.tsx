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
// import MapLegend from "./components/MapLegend";
import { CurrentSkeleton } from "./components/skeletons/CurrentSkeleton";
import { HourlySkeleton } from "./components/skeletons/HourlySkeleton";
import { DailySkeleton } from "./components/skeletons/DailySkeleton";
import { AdditionalInfoSkeleton } from "./components/skeletons/AdditionalInfoSkeleton";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});


function App() {
  const [ coordinates, setCoords ] = useState<Coords>({ lat: 49.2333, lon: 7.0 })
  const [ location, setLocation ] = useState("Saarbrücken")
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
    <div className="dark flex flex-col gap-2 p-2 w-full 2xl:h-screen 2xl:min-h-[1120px]">
      <div className="flex flex-col items-start md:items-center justify-between px-2 py-1 mt-2 m-1 xs:flex-row xs:gap-4">

        {/* Skyline heading */}
        <h1 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-white/90">
          Skyline
        </h1>

        {/* Dropdown GROUP */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 md:ml-auto items-stretch sm:items-center w-full sm:w-auto md:flex-row gap-2 md:gap-4">
          
          {/* Location dropdown */}
          <LocationDropdown location={location} setLocation={setLocation}/>
          
          {/* Map type dropdown */}
          <MapTypeDropdown mapType={mapType} setMapType={setMapType}/>
        
        </div>

      </div>
      

      <div className="grid grid-cols-1 2xl:flex-2 2xl:min-h-0 md:grid-cols-7 2xl:grid-cols-7 2xl:grid-rows-7 gap-x-1 gap-y-3">
        <div className="relative h-100 2xl:h-auto z-0 col-span-1 md:col-span-7 md:row-span-2 2xl:col-span-7 2xl:row-span-3 order-1">
          <Map coords={coords} onMapClick={onMapClick} mapType={mapType}/>
          {/* <MapLegend mapType={mapType}/> */}
        </div>
        
        <div className="col-span-1 md:col-span-3 2xl:col-span-2 2xl:row-span-3 
        order-2 md:order-2 2xl:order-2">
          <Suspense fallback={<CurrentSkeleton/>}>
            <CurrentWeather coords={coords}/>
          </Suspense>
        </div>

        
        <div className="col-span-1 md:col-span-7 2xl:col-span-3 2xl:row-span-1 
        order-3 md:order-4 2xl:order-3">
          <Suspense fallback={<HourlySkeleton/>}>
            <HourlyForecast coords={coords}/>
          </Suspense>
        </div>
        
        <div className="col-span-1 md:col-span-4 2xl:col-span-2 2xl:row-span-3 flex flex-col gap-3
          order-4 md:order-3 2xl:order-4">
          <Suspense fallback={<DailySkeleton/>}>
            <DailyForecast coords={coords}/>
          </Suspense>
        
          <Suspense fallback={<AdditionalInfoSkeleton/>}>
            <AdditionalInfo coords={coords}/>
          </Suspense>
        </div>
      </div>
      
    </div>
  )
}

export default App
