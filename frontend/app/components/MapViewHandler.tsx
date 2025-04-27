import { useNavigate } from 'react-router';
import type { Fijalist } from '~/lib/types';
import MapView from './MapView';

interface MapViewHandlerProps {
  items: Fijalist[];
}

export default function MapViewHandler({ items }: MapViewHandlerProps) {
  const navigate = useNavigate();

  // handle pin click with option to open in new tab
  const handleFijalistClick = (fijalist: Fijalist, openInNewTab = false) => {
    const url = `/fijalist/${fijalist.id}`;
    
    if (openInNewTab) {
      window.open(url, '_blank');
    } else {
      // save current view mode to localStorage before navigating
      localStorage.setItem('catalogViewMode', 'map');
      navigate(url);
    }
  };

  return (
    <MapView
      items={items}
      onItemClick={handleFijalistClick}
    />
  );
} 
