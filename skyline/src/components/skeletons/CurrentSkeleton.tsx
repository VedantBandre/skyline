import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";
// import WeatherIcon from "../WeatherIcon";

type Props = {}

export function CurrentSkeleton ({} : Props) {
  return (
    <Card 
        title="Aktuelles Wetter" 
        childrenClassName="flex flex-col items-center">
        
        <div className="flex flex-col items-center">
            
            <Skeleton className="w-22.5 h-10"/>
            {/* <h2 className="text-4xl font-semibold text-center">
                {Math.round(data.current.temp_c)} °C
            </h2> */}
            
            <Skeleton className="size-30 rounded-full"/>
            {/* <WeatherIcon src={data.current.condition.icon} className="size-30"/> */}
            
            <Skeleton className="w-20 h-8"/>
            {/* <h3 className="capitalize font-medium text-2xl">
                {data.current.condition.text}
            </h3> */}
        </div>

        <div className="flex justify-between items-center w-full p-2 pt-6">
            <div className="flex-1 flex flex-col items-center gap-2">
                <p className="text-gray-300/75">Feuchtigkeit</p>
                <Skeleton className="w-18 h-6"/>
                {/* <p>{data.current.humidity}%</p> */}
            </div>
            
            <div className="flex-1 flex flex-col items-center gap-2">
                <p className="text-gray-300/75">Gefühlt wie</p>
                <Skeleton className="w-18 h-6"/>
                {/* <p>{data.current.feelslike_c} °C</p> */}
            </div>
            
            <div className="flex-1 flex flex-col items-center gap-2">
                <p className="text-gray-300/75">Wind</p>
                <Skeleton className="w-18 h-6"/>
                {/* <p>{data.current.wind_kph} kmph</p> */}
            </div>
        </div>
        </Card>
  );
}
