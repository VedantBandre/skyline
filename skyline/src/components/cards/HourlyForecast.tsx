import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import Card from "./Card";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";

type Props = {
    coords : Coords
}

const formatHour = (hourStr: string) => {
    const date = new Date(hourStr.replace(/-/g,'\/'));
    const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    // second: "numeric",
    // timeZone: "Germany/Berlin",
    // timeZoneName: "short",
    };
    return date.toLocaleTimeString("de-DE", options);
};

export default function HourlyForecast({ coords }: Props) {

    const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
    });

    return (
        <Card 
        title="24-Stunden Vorhersage"
        childrenClassName="flex gap-6 overflow-x-scroll overflow-hidden pb-1 2xl:pb-2 pt-2">
            {data.forecast.forecastday[0].hour.map(hour => (
                <div key={hour.time} className="flex flex-col gap-3 p-2 items-center 2xl:gap-6 2xl:justify-between">
                    <p className="2xl:scale-110">{formatHour(hour.time)}</p>
                    <WeatherIcon className="2xl:size-16" src={hour.condition.icon}/>
                    <p className="items-center 2xl:scale-110">{Math.round(hour.temp_c)}<span className="inline-block w-1"></span>°C</p>
                    <p className="items-center capitalize p-1">{hour.condition.text}</p>
                </div>
            ))}
        </Card>
    )
    
}