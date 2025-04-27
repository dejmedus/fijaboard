import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { Fijalist } from '~/lib/types';
import 'leaflet/dist/leaflet.css';
import '../styles/map.css';
import L from 'leaflet';

interface MapViewProps {
  items: Fijalist[];
  onItemClick: (fijalist: Fijalist, openInNewTab?: boolean) => void;
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
  
  // func to truncate description text
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };
  
  const handleClick = (event: React.MouseEvent, fijalist: Fijalist) => {
    // check if ctrl or cmd key is pressed to open in new tab
    const openInNewTab = event.ctrlKey || event.metaKey;
    onItemClick(fijalist, openInNewTab);
  };
  
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
          >
            <Popup>
              <div className="map-popup-content">
                <div className="p-3">
                  <h3 className="map-popup-title">{item.title}</h3>
                  <p className="map-popup-location">{item.location?.name}</p>
                  {item.description && (
                    <p className="map-popup-description">
                      {truncateText(item.description, 100)}
                    </p>
                  )}
                  <button 
                    className="map-popup-button"
                    onClick={(e) => handleClick(e, item)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    View Full List
                  </button>
                  <p className="text-xs text-gray-500 mt-1 text-center">
                    {navigator.platform.indexOf('Mac') !== -1 ? '⌘' : 'Ctrl'}+Click to open in new tab
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
} 
