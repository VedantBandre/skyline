import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
// import WeatherIcon from "../WeatherIcon";
import Card from "./Card";

type Props = {}

const rows = [
    {
        label: "Bewölkung(%)",
        value: 'cloud'
    },
    {
        label: "UV-index",
        value: 'uv'
    },
    {
        label: "Windrichtung(°)",
        value: 'wind_degree'
    },
    {
        label: "Luftdruck(mb)",
        value: 'pressure_mb'
    },
] as const;

export default function AdditionalInfo ({} : Props) {

    const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 49.2333, lon: 7.0, days:7 }),
    });

    return (
        <Card title="Additional Info" childrenClassName="flex flex-col gap-8">
            {rows.map(({ label, value }) => (
                <div className="flex justify-between" key={value}>
                    <span className="text-gray-300/75">{label}</span>
                    <span>{data.current[value]}</span>
                </div>
            ))}
        </Card>
    )
};