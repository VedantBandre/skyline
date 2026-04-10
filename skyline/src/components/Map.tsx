import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import type { Coords } from '../types';
import { useEffect } from 'react';
import { MaptilerLayer } from '@maptiler/leaflet-maptilersdk';
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const VITE_MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

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
            
            {/* Base Map
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> */}
            
            <MapTileLayer />
            
            {/* Weather Overlay */}
            <TileLayer 
            key={`${mapType}-${timestamp}`}
            url={`https://weathermaps.weatherapi.com/${mapType}/tiles/${timestamp}/{z}/{x}/{y}.png`}
            opacity={0.45}
            crossOrigin={false}
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


// TODO: Reduce to using TileLayer
function MapTileLayer() {
    const map = useMap()

    useEffect(() => {
        const tileLayer = new MaptilerLayer({
            style: "basic-dark", 
            apiKey: VITE_MAPTILER_API_KEY, 
        })
        tileLayer.addTo(map)

        return () => {
            map.removeLayer(tileLayer)
        }
    }, [map])

    return null
}