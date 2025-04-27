import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { Fijalist } from '~/lib/types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface MapViewProps {
  items: Fijalist[];
  onItemClick: (fijalist: Fijalist) => void;
}

export default function MapView({ items, onItemClick }: MapViewProps) {
  const DEFAULT_CENTER: [number, number] = [40.7128, -74.0060]; // default is ny lol
  
  // fix Leaflet icon issues when bundling??
  useEffect(() => {
    // @ts-ignore - apparently it's a known issue with Leaflet types
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/marker-icon-2x.png',
      iconUrl: '/marker-icon.png',
      shadowUrl: '/marker-shadow.png',
    });
  }, []);
  
  return (
    <div className="w-full h-[calc(100vh-220px)] rounded-lg overflow-hidden">
      <MapContainer 
        center={DEFAULT_CENTER} 
        zoom={3} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {items.filter(item => item.location).map(item => (
          <Marker 
            key={item.id}
            position={[item.location!.latitude, item.location!.longitude]}
            eventHandlers={{
              click: () => onItemClick(item),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.location?.name}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
} 
