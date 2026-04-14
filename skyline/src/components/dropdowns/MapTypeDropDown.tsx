import type { Dispatch, SetStateAction } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type Props = {
    mapType : string
    setMapType : Dispatch<SetStateAction<string>>
}

export function MapTypeDropdown ({ mapType, setMapType } : Props) {
  // human readable label lookup
  const currentLabel = weatherMapTypes.find(t => t.value === mapType)?.label;

  return (
    <Select value={mapType} onValueChange={(value) => value && setMapType(value)}>
        <SelectTrigger className="w-full xs:w-[180px]">
            <SelectValue placeholder="Kartentyp">
                {currentLabel}
            </SelectValue>
        </SelectTrigger>
        
        <SelectContent className="z-[1001] p-2">
            {weatherMapTypes.map((type) => (
                <SelectItem key={type.value} value={type.value} className='capitalize'>
                    {type.label}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
  )
}

const weatherMapTypes = [
    { value: "tmp2m", label: "Temperatur" },
    { value: "precip", label: "Niederschlag" },
    { value: "pressure", label: "Luftdruck" },
    { value: "wind", label: "Windgeschwindigkeit" }
];
