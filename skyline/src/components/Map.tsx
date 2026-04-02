import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import type { Coords } from '../types';

type Props = {
    coords : Coords
    onMapClick: (lat: number, lon: number) => void
}

export default function Map ({ coords, onMapClick } : Props) {
    const {lat, lon} = coords
    return (
        <div>
            <MapContainer 
            center={[lat, lon]} 
            zoom={7} 
            style={{width: '100%', height: '500px'}} 
            // scrollWheelZoom={false}
            >
                <MapClick onMapClick={onMapClick}/>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lat, lon]} />
            </MapContainer>
        </div>
    );
}


function MapClick({
    onMapClick,
}: {
    onMapClick: (lat: number, lon: number) => void
}) {
    const map = useMap()

    // map.panTo([coords.lat, coords.lon])

    map.on("click", (e) => {
        const { lat, lng } = e.latlng
        map.panTo([lat, lng])
        onMapClick(lat, lng)
    })
    return null;
}