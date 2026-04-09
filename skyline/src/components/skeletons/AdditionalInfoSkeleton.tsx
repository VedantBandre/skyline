import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

type Props = {}

export function AdditionalInfoSkeleton ({} : Props) {
  return (
    <Card 
        title="Additional Info" 
        childrenClassName="grid grid-cols-1 md:grid-cols-1 gap-8">
            {Array.from({ length : 4 }).map(( _, index) => (
                <div className="flex justify-between" key={index}>
                    <div className="flex gap-4">
                        <Skeleton className="w-8 h-8" />
                        {/* <Icon className="invert size-8"></Icon> */}
                        <Skeleton className="w-37 h-8" />
                        {/* <span className="text-gray-300/75">{label}</span> */}
                    </div>
                    <Skeleton className="w-10 h-8" />
                    {/* {data.current[value]} */}
                </div>
            ))}
        </Card>
  );
}
