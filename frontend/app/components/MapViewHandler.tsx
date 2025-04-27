import { useNavigate } from 'react-router';
import type { Fijalist } from '~/lib/types';
import MapView from './MapView';

interface MapViewHandlerProps {
  items: Fijalist[];
}

export default function MapViewHandler({ items }: MapViewHandlerProps) {
  const navigate = useNavigate();

  // to handle pin click by navigating directly to the fijalist detail page
  const handleFijalistClick = (fijalist: Fijalist) => {
    navigate(`/fijalist/${fijalist.id}`);
  };

  return (
    <MapView
      items={items}
      onItemClick={handleFijalistClick}
    />
  );
} 
