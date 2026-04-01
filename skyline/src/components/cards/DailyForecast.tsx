import { type ReactNode } from "react";
import Card from "./Card";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";

type Props = {
}

export default function DailyForecast({ }: Props) {
    
    const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 51.508, lon: -0.121 }),
    });

    return (
        <Card title="Daily Forecast">
            <div className="flex flex-col gap-4">
            {data.forecast.forecastday.map(day => (
                <div key={day.date} className="flex justify-inbetween">
                    <p>DATE</p>
                </div>
            ))}
            </div>
        </Card>
    )
}