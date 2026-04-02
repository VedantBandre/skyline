import Card from "./Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";

type Props = {
    coords : Coords
}

const formatDate = (dateStr: string) => {
    const date = new Date(dateStr.replace(/-/g,'\/'));
    const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    // year: "numeric",
    // month: "long",
    // day: "numeric",
    };
    return date.toLocaleString("de-DE", options);
};

export default function DailyForecast({ coords }: Props) {
    
    const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
    });

    return (
        <Card title="Tägliche Vorhersage" childrenClassName="flex flex-col">
            {data.forecast.forecastday.map(day => (
                <div key={day.date} className="flex justify-between items-center">
                    {/* <p>{day.date}</p> */}
                    <p className="w-9">{formatDate(day.date)}</p>
                    <WeatherIcon src={day.day.condition.icon}/>
                    {/* <img 
                    className="size-8" 
                    src={`https:${day.day.condition.icon}`}
                    alt="Weather Icon"
                    /> */}
                    <p className="items-center">{Math.round(day.day.avgtemp_c)} °C</p>
                    <p className="text-gray-300/75 items-center">{Math.round(day.day.mintemp_c)} °C</p>
                    <p className="text-gray-300/75 items-center">{Math.round(day.day.maxtemp_c)} °C</p>
                </div>
            ))}
        </Card>
    )
}