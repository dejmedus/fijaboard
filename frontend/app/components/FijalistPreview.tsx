import { Link } from "react-router";
import type { Fijalist } from "~/lib/types";
import { saveScrollPosition } from "../hooks/useScrollPosition";
import useData from "~/hooks/useData";
import { useState, useEffect } from "react";
import Toast from "./Toast";

interface FijalistPreviewProps {
  fijalist: Fijalist;
  activeCollectionTab?: number;
  onClose: () => void;
}

export default function FijalistPreview({
  fijalist,
  activeCollectionTab = 0, // Defaulting to 0 if undefined
  onClose,
}: FijalistPreviewProps) {
  const { collections, addFijalistToCollection, removeFijalistFromCollection } =
    useData();
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [collectionNames, setCollectionNames] = useState<string[]>([]);

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
  
  // check if fijalist is in any collections
  useEffect(() => {
    if (fijalist && collections.length > 0) {
      const names: string[] = [];
      
      collections.forEach(collection => {
        if (collection.fijalists?.some(f => String(f.id) === String(fijalist.id))) {
          names.push(collection.name);
        }
      });
      
      setCollectionNames(names);
    }
  }, [fijalist, collections]);
  
  // handle adding to collection
  const handleAddToCollection = async (collectionId: string) => {
    if (!collectionId) return;
    
    const success = await addFijalistToCollection(collectionId, fijalist);
    if (success) {
      const collection = collections.find(c => String(c.id) === collectionId);
      const collectionName = collection ? collection.name : 'collection';
      
      // update collection names
      setCollectionNames(prev => [...prev, collectionName]);
      
      // show toast notid
      setToast({
        visible: true,
        message: `"${fijalist.title}" added to ${collectionName}`
      });
    }
  };
  
  // handle removing from collection
  const handleRemoveFromCollection = async (collectionId: string) => {
    if (!collectionId) return;
    
    const success = await removeFijalistFromCollection(
      collectionId,
      String(fijalist.id)
    );
    
    if (success) {
      const collection = collections.find(c => String(c.id) === collectionId);
      const collectionName = collection ? collection.name : 'collection';
      
      // update collection names
      setCollectionNames(prev => prev.filter(name => name !== collectionName));
      
      // show toast notif
      setToast({
        visible: true,
        message: `"${fijalist.title}" removed from ${collectionName}`
      });
      
      // close modal if in collection view
      if (activeCollectionTab && activeCollectionTab !== 0) {
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    }
  };
  
  // close toast
  const handleCloseToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  // check if fijalist is already in the selected collection
  const isInSelectedCollection = (collectionId: string) => {
    if (!collections.length) return false;
    
    const collection = collections.find(c => String(c.id) === collectionId);
    return collection?.fijalists?.some(f => String(f.id) === String(fijalist.id)) || false;
  };

  // ASH: check if fijalist is part of the active collection
  const isInCollection =
    activeCollectionTab > 0 &&
    collections[activeCollectionTab - 1]?.fijalists?.some(
      (item) => item.id === fijalist.id
    );

  return (
    <div className="flex flex-col">
      <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
        <img
          src={
            fijalist.cover_image ||
            "https://via.placeholder.com/800x400?text=No+Image"
          }
          alt={fijalist.title}
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-2xl font-bold mb-2">{fijalist.title}</h2>

      {fijalist.tags && fijalist.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {fijalist.tags.map((tag) => (
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

        <div className="flex items-center gap-2">
          {/* conditionally render buttons */}
          {isInCollection ? (
            <button
              onClick={async () => {
                const collectionId = String(
                  collections[activeCollectionTab - 1].id
                );
                await handleRemoveFromCollection(collectionId);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              Remove from Collection
            </button>
          ) : (
            <select
              onChange={async (e) => {
                await handleAddToCollection(e.target.value);
                e.target.value = ""; // Reset select after selection
              }}
              value=""
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="">Add to Collection</option>
              {collections.map((collection) => {
                const isAlreadyInCollection = isInSelectedCollection(String(collection.id));
                return (
                  <option 
                    key={collection.id} 
                    value={collection.id}
                    disabled={isAlreadyInCollection}
                  >
                    {collection.name} {isAlreadyInCollection ? '(Already added)' : ''}
                  </option>
                );
              })}
            </select>
          )}
          
          <Link
            to={`/fijalist/${String(fijalist.id)}`}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            onClick={handleViewFullList}
          >
            View Full List
          </Link>
        </div>
      </div>
      
      {/* toast notif */}
      <Toast
        message={toast.message}
        isVisible={toast.visible}
        onClose={handleCloseToast}
        type="success"
      />
    </div>
  );
}
