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
        <Card title="Tägliche Vorhersage" childrenClassName="flex flex-col 2xl:justify-between">
            {data.forecast.forecastday.map(day => (
                <div key={day.date} className="flex justify-between items-center py-0.25">
                    {/* <p>{day.date}</p> */}
                    <p className="w-9">{formatDate(day.date)}</p>
                    <WeatherIcon src={day.day.condition.icon}/>
                    
                    {/* Using text-right and font-mono ensures digits line up perfectly */}
                    <p className="w-12 text-right font-mono">
                        {Math.round(day.day.avgtemp_c)}<span className="inline-block w-1"></span>°C
                    </p>
                    
                    <p className="w-12 text-right font-mono text-gray-300/75">
                        {Math.round(day.day.mintemp_c)}<span className="inline-block w-1"></span>°C
                    </p>
                    
                    <p className="w-12 text-right font-mono text-gray-300/75">
                        {Math.round(day.day.maxtemp_c)}<span className="inline-block w-1"></span>°C
                    </p>
                </div>
            ))}
        </Card>
    )
}