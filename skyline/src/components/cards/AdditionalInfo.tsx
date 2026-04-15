import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
// import WeatherIcon from "../WeatherIcon";
import Card from "./Card";
import Bewölkung from "/src/assets/cloud.svg?react";
import UV from "/src/assets/uv.svg?react";
import Windrichtung from "/src/assets/wind.svg?react";
import Luftdruck from "/src/assets/pressure.svg?react";
import type { Coords } from "../../types";

type Props = {
    coords : Coords
}

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

export default function AdditionalInfo ({ coords } : Props) {

    const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
    });

    return (
        <Card 
        title="Zusatzinfo" 
        childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-2 2xl:gap-1 pb-1">
            {rows.map(({ label, value, Icon }) => (
                <div className="flex justify-between items-center-safe md:pl-2 md:pr-4 md:py-1 2xl:py-1 2xl:px-2" key={value}>
                    
                    <div className="flex gap-4 items-center-safe">
                        <Icon className="dark:invert size-8"></Icon>
                        <span className="text-gray-700/75 dark:text-gray-300/75 pt-1">{label}</span>
                    </div>
                    
                    <span className="pt-1">
                        {data.current[value]}
                    </span>
                </div>
            ))}
        </Card>
    )
};