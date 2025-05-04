import { useRef, useEffect } from 'react';
import type { Fijalist } from '~/lib/types';
import useData from '~/hooks/useData';

interface AddToCollectionModalProps {
  fijalist: Fijalist;
  isOpen: boolean;
  onClose: () => void;
}

export default function AddToCollectionModal({ 
  fijalist,
  isOpen,
  onClose
}: AddToCollectionModalProps) {
  const { collections, addFijalistToCollection } = useData();
  const modalRef = useRef<HTMLDivElement>(null);

  // close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAddToCollection = async (collectionId: string) => {
    if (collectionId) {
      await addFijalistToCollection(collectionId, fijalist);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop w glass effect */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/30" />
      
      {/* acc modal content */}
      <div 
        ref={modalRef}
        className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 z-10"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add to Collection</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Select a collection to add "{fijalist.title}"</p>
          
          {collections.length === 0 ? (
            <p className="text-sm text-gray-500">You don't have any collections yet.</p>
          ) : (
            <div className="grid gap-2 max-h-60 overflow-y-auto">
              {collections.map((collection) => (
                <button
                  key={collection.id}
                  onClick={() => handleAddToCollection(String(collection.id))}
                  className="text-left p-3 border border-gray-200 rounded-md hover:bg-purple-50 transition-colors flex justify-between items-center"
                >
                  <span>{collection.name}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 mr-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
} 
