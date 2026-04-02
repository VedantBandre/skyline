import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
// import WeatherIcon from "../WeatherIcon";
import Card from "./Card";
import Bewölkung from "/src/assets/sunrise.svg?react";
import UV from "/src/assets/uv.svg?react";
import Windrichtung from "/src/assets/wind.svg?react";
import Luftdruck from "/src/assets/pressure.svg?react";

type Props = {}

const rows = [
    {
        label: "Bewölkung(%)",
        value: 'cloud',
        Icon: Bewölkung
    },
    {
        label: "UV-index",
        value: 'uv',
        Icon: UV
    },
    {
        label: "Windrichtung(°)",
        value: 'wind_degree',
        Icon: Windrichtung
    },
    {
        label: "Luftdruck(mb)",
        value: 'pressure_mb',
        Icon: Luftdruck
    },
] as const;

export default function AdditionalInfo ({} : Props) {

    const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 49.2333, lon: 7.0, days:7 }),
    });

    return (
        <Card 
        title="Additional Info" 
        childrenClassName="flex flex-col gap-8">
            {rows.map(({ label, value, Icon }) => (
                <div className="flex justify-between" key={value}>
                    
                    <div className="flex gap-4">
                        <span className="text-gray-300/75">{label}</span>
                        <Icon className="invert size-8"></Icon>
                    </div>
                    
                    <span>
                        {data.current[value]}
                    </span>
                </div>
            ))}
        </Card>
    )
};