import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import WeatherIcon from "../WeatherIcon";
import Card from "./Card";

type Props = {}

export default function CurrentWeather ({} : Props) {

    const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 49.2333, lon: 7.0, days:7 }),
    });

    return (
        <Card 
        title="Aktuelles Wetter" 
        childrenClassName="flex flex-col items-center">
        <div className="flex flex-col gap-2 items-center">
            <h2 className="text-5xl font-semibold text-center">
                {Math.round(data.current.temp_c)} °C
            </h2>
            <WeatherIcon src={data.current.condition.icon} className="size-25"/>
            <h3 className="capitalize font-medium text-2xl">{data.current.condition.text}</h3>
            <h4 className="text-xl">Gefühlt wie {data.current.feelslike_c} °C</h4>
        </div>
        </Card>
    )
}
