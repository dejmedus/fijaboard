import type { Fijalist } from "~/lib/types";
import { getRandomHeight } from "../utils/display";
import useData from "~/hooks/useData";
import { useState } from "react";

interface MasonryGridProps {
  items: Fijalist[];
  lastItemRef?: (node: HTMLDivElement | null) => void;
  onItemClick: (item: Fijalist) => void;
}

export default function MasonryGrid({ items, lastItemRef, onItemClick }: MasonryGridProps) {
  const { collections, addFijalistToCollection } = useData();
  const [showDropdown, setShowDropdown] = useState<string | null>(null);

  const handleAddToCollection = async (e: React.MouseEvent, collectionId: string, item: Fijalist) => {
    e.stopPropagation();
    await addFijalistToCollection(collectionId, item);
    setShowDropdown(null);
  };

  const toggleDropdown = (e: React.MouseEvent, itemId: string | number) => {
    e.stopPropagation();
    setShowDropdown(showDropdown === String(itemId) ? null : String(itemId));
  };

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
      {items.map((item, index) => (
        <article
          key={item.id}
          ref={index === items.length - 1 ? lastItemRef : null}
          className="break-inside-avoid mb-4"
        >
          <div 
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer relative"
            onClick={() => onItemClick(item)}
          >
            <figure className="relative">
              <img
                src={item.cover_image || 'https://via.placeholder.com/400x300?text=No+Image'}
                alt={item.title}
                className="w-full h-full object-cover"
                style={{ height: `${getRandomHeight()}rem` }}
              />
              {collections.length > 0 && (
                <div className="absolute top-2 right-2 z-10">
                  <button
                    onClick={(e) => toggleDropdown(e, item.id)}
                    className="w-8 h-8 flex items-center justify-center bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full shadow-sm text-gray-700"
                    aria-label="Add to collection"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={1.5} 
                      stroke="currentColor" 
                      className="w-5 h-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                  
                  {showDropdown === String(item.id) && (
                    <div 
                      className="absolute right-0 mt-1 w-48 bg-white rounded-md overflow-hidden shadow-xl z-20"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="py-1">
                        {collections.map((collection) => (
                          <button
                            key={collection.id}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                            onClick={(e) => handleAddToCollection(e, String(collection.id), item)}
                          >
                            {collection.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </figure>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
} 
