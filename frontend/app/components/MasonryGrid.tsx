import type { Fijalist } from "~/lib/types";
import { getRandomHeight } from "../utils/display";
import { useState } from "react";
import AddToCollectionModal from "./AddToCollectionModal";
import useAuth from "~/hooks/useAuth";

interface MasonryGridProps {
  items: Fijalist[];
  lastItemRef?: (node: HTMLDivElement | null) => void;
  onItemClick: (item: Fijalist) => void;
}

export default function MasonryGrid({ items, lastItemRef, onItemClick }: MasonryGridProps) {
  const [selectedFijalist, setSelectedFijalist] = useState<Fijalist | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  const handleAddToCollection = (item: Fijalist, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFijalist(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedFijalist(null);
  };

  return (
    <>
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {items.map((item, index) => (
          <article
            key={item.id}
            ref={index === items.length - 1 ? lastItemRef : null}
            className="break-inside-avoid mb-4"
          >
            <div 
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer relative group"
              onClick={() => onItemClick(item)}
            >
              <figure className="relative">
                <img
                  src={item.cover_image || 'https://via.placeholder.com/400x300?text=No+Image'}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  style={{ height: `${getRandomHeight()}rem` }}
                />
                {user && (
                  <button
                    onClick={(e) => handleAddToCollection(item, e)}
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Add to collection"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
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

      {selectedFijalist && (
        <AddToCollectionModal
          fijalist={selectedFijalist}
          isOpen={showModal}
          onClose={closeModal}
        />
      )}
    </>
  );
} 
