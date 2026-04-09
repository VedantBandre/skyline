import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

type Props = {}

export function HourlySkeleton ({} : Props) {
  return (
    <Card 
        title="24-Stunden Vorhersage"
        childrenClassName="flex gap-6 overflow-x-scroll overflow-hidden no-scrollbar pb-1">
            {Array.from({length: 15}).map((_, index) => (
                <div key={index} className="flex flex-col gap-4 p-2 items-center">
                    
                    <Skeleton className="w-11.5 h-6"/>
                    {/* <p>{formatHour(hour.time)}</p> */}
                    
                    <Skeleton className="w-8 h-8"/>
                    {/* <WeatherIcon src={hour.condition.icon}/> */}
                    
                    <Skeleton className="w-8.5 h-6"/>
                    {/* <p>{Math.round(hour.temp_c)} °C</p> */}

                    <Skeleton className="w-12.5 h-11.5"/>
                    {/* <p className="items-center capitalize">{hour.condition.text}</p> */}

                </div>
            ))}
    </Card>
  );
}
