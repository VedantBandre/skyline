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
        childrenClassName="flex gap-6 overflow-x-scroll overflow-hidden no-scrollbar pb-1">
            {data.forecast.forecastday[0].hour.map(hour => (
                <div key={hour.time} className="flex flex-col gap-4 p-2 items-center">
                    <p>{formatHour(hour.time)}</p>
                    <WeatherIcon src={hour.condition.icon}/>
                    <p>{Math.round(hour.temp_c)} °C</p>
                    <p className="items-center capitalize">{hour.condition.text}</p>
                </div>
            ))}
        </Card>
    )
    
}