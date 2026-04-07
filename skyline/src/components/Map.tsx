import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import type { Coords } from '../types';

type Props = {
    coords : Coords
    onMapClick: (lat: number, lon: number) => void
    mapType?: string
}

export default function Map ({ coords, onMapClick, mapType } : Props) {
    const {lat, lon} = coords

    const timestamp = getWeatherApiTimestamp();
    
    return (
        <div className='rounded-xl'>
            <MapContainer 
            center={[lat, lon]} 
            zoom={6} 
            style={{width: '100%', height: '250px'}} 
            // scrollWheelZoom={false}
            >
            <MapClick onMapClick={onMapClick} coords={coords}/>
            
            {/* Base Map */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Weather Overlay */}
            <TileLayer 
            key={`${mapType}-${timestamp}`}
            url={`https://weathermaps.weatherapi.com/${mapType}/tiles/${timestamp}/{z}/{x}/{y}.png`}
            opacity={0.45}
            crossOrigin={true}
            />
            
            <Marker position={[lat, lon]} />
            </MapContainer>
        </div>
    );
}


function MapClick({
    onMapClick,
    coords
}: {
    onMapClick: (lat: number, lon: number) => void
    coords: Coords
}) {
    const map = useMap()

    map.panTo([coords.lat, coords.lon])

    map.on("click", (e) => {
        const { lat, lng } = e.latlng
        onMapClick(lat, lng)
    })
    return null;
}


const getWeatherApiTimestamp = () => {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hour = String(now.getUTCHours()).padStart(2, '0');

    return `${year}${month}${day}${hour}`;
};