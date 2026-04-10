import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import WeatherIcon from "../WeatherIcon";
import Card from "./Card";
import type { Coords } from "../../types";

type Props = {
    coords : Coords
}

export default function CurrentWeather ({ coords } : Props) {

    const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
    });

    return (
        <Card 
        title="Aktuelles Wetter" 
        childrenClassName="flex flex-col items-center">
        
        <div className="flex flex-col items-center">
            <h2 className="text-4xl font-semibold text-center mb-2">
                {Math.round(data.current.temp_c)}<span className="inline-block w-1"></span>°C
            </h2>
            <WeatherIcon src={data.current.condition.icon} className="size-30"/>
            <h3 className="capitalize font-medium text-2xl">
                {data.current.condition.text}
            </h3>
        </div>

        <div className="flex justify-between items-center w-full p-2 pt-6">
            <div className="flex-1 flex flex-col items-center gap-2">
                <p className="text-gray-300/75">Feuchtigkeit</p>
                <p>{data.current.humidity}<span className="inline-block w-1"></span>%</p>
            </div>
            
            <div className="flex-1 flex flex-col items-center gap-2">
                <p className="text-gray-300/75">Gefühlt wie</p>
                <p>{Math.round(data.current.feelslike_c)}<span className="inline-block w-1"></span>°C</p>
            </div>
            
            <div className="flex-1 flex flex-col items-center gap-2">
                <p className="text-gray-300/75">Wind</p>
                <p>{data.current.wind_kph}<span className="inline-block w-1"></span>km/h</p>
            </div>
        </div>
        </Card>
    )
}

