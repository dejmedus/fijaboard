import { Link } from "react-router";
import type { Fijalist } from "~/lib/types";
import { saveScrollPosition } from "../hooks/useScrollPosition";

interface FijalistPreviewProps {
  fijalist: Fijalist;
  onClose: () => void;
}

export default function FijalistPreview({ fijalist, onClose }: FijalistPreviewProps) {
  // helper to truncate content to a shorter preview
  const truncateContent = (content: string, maxLength = 300) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  // handle click on the view full list button
  const handleViewFullList = () => {
    saveScrollPosition("catalog");
    onClose();
  };

  return (
    <div className="flex flex-col">
      <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
        <img 
          src={fijalist.cover_image || 'https://via.placeholder.com/800x400?text=No+Image'} 
          alt={fijalist.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <h2 className="text-2xl font-bold mb-2">{fijalist.title}</h2>
      
      {fijalist.tags && fijalist.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {fijalist.tags.map(tag => (
            <span 
              key={tag.id}
              className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}
      
      <p className="text-gray-600 mb-4">{fijalist.description}</p>
      
      <div className="prose mb-6">
        <div className="whitespace-pre-wrap text-gray-700">
          {truncateContent(fijalist.content)}
        </div>
      </div>
      
      <div className="flex justify-between mt-auto pt-4 border-t">
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          Close
        </button>
        
        <Link
          to={`/fijalist/${String(fijalist.id)}`}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          onClick={handleViewFullList}
        >
          View Full List
        </Link>
      </div>
    </div>
  );
} 
