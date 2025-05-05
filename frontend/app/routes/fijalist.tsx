import { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router";
import useData from "../hooks/useData";
import type { Fijalist } from "~/lib/types";
import MasonryGrid from "../components/MasonryGrid";
import Modal from "../components/Modal";
import FijalistPreview from "../components/FijalistPreview";
import { saveScrollPosition } from "../hooks/useScrollPosition";
import AddToCollectionModal from "../components/AddToCollectionModal";
import useAuth from "../hooks/useAuth";
import Toast from "../components/Toast";

export default function FijalistDetail() {
  const { id } = useParams<{ id: string }>();
  const { fijalists, isLoading, collections } = useData();
  const { user } = useAuth();
  
  const [currentFijalist, setCurrentFijalist] = useState<Fijalist | null>(null);
  
  // modal state for previewing related lists
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedFijalist, setSelectedFijalist] = useState<Fijalist | null>(null);
  
  // state for add to collection modal
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  
  // state for toast notification
  const [toast, setToast] = useState({ visible: false, message: '' });
  
  // state to track if fijalist is in a collection
  const [collectionNames, setCollectionNames] = useState<string[]>([]);
  
  // handle clicking on a related list
  const handleRelatedListClick = (fijalist: Fijalist) => {
    setSelectedFijalist(fijalist);
    setIsPreviewOpen(true);
  };
  
  // close the preview modal
  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  // open add to collection modal
  const handleAddToCollection = () => {
    setShowCollectionModal(true);
  };

  // close add to collection modal
  const handleCloseCollectionModal = () => {
    setShowCollectionModal(false);
  };
  
  // handle collection add success
  const handleCollectionAddSuccess = (collectionName: string) => {
    setCollectionNames(prev => [...prev, collectionName]);
    setToast({
      visible: true,
      message: `Added to ${collectionName}`
    });
  };
  
  // close toast
  const handleCloseToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  // get current fijalist based on ID from route params
  useEffect(() => {
    if (id && fijalists.length > 0) {
      // convert id to string for comparison since backend returns numbers but route params are strings
      const fijalist = fijalists.find(item => String(item.id) === id);
      setCurrentFijalist(fijalist || null);
    }
  }, [id, fijalists]);
  
  // check if fijalist is in any collections
  useEffect(() => {
    if (currentFijalist && collections.length > 0) {
      const names: string[] = [];
      
      collections.forEach(collection => {
        if (collection.fijalists?.some(f => String(f.id) === String(currentFijalist.id))) {
          names.push(collection.name);
        }
      });
      
      setCollectionNames(names);
    }
  }, [currentFijalist, collections]);

  // function to find related lists based on tags
  const findRelatedLists = useCallback(() => {
    if (!currentFijalist || !currentFijalist.tags) return [];
    
    const currentTags = currentFijalist.tags.map(tag => tag.id);
    
    // find other fijalists with at least one matching tag, excluding current one
    return fijalists.filter(item => 
      String(item.id) !== String(currentFijalist.id) && 
      item.tags && 
      item.tags.some(tag => currentTags.includes(tag.id))
    );
  }, [currentFijalist, fijalists]);

  // get all related lists at once - adding to fix infinite rendering issue
  const relatedLists = currentFijalist ? findRelatedLists() : [];

  // handle click on the back button to save scroll position
  const handleBackClick = () => {
    saveScrollPosition("catalog");
  };

  // display appropriate loading/error states
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading data...</div>;
  }

  if (fijalists.length > 0 && !currentFijalist) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <div className="bg-purple-100 rounded-full p-3 mb-4">
          <svg 
            className="h-8 w-8 text-purple-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>
        <h1 className="text-xl font-semibold mb-2">Fijalist Not Found</h1>
        <p className="text-gray-600 mb-4">The fijalist you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/catalog" 
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          onClick={handleBackClick}
        >
          Back to Catalog
        </Link>
      </div>
    );
  }

  if (!currentFijalist) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const isInCollection = collectionNames.length > 0;

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* back button */}
        <Link 
          to="/catalog" 
          className="inline-flex items-center mb-6 text-purple-600 hover:text-purple-800"
          onClick={handleBackClick}
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Back to Catalog
        </Link>

        {/* main fijalist content */}
        <section className="mb-12">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            {/* cover image */}
            <div className="relative h-72 md:h-96">
              <img 
                src={currentFijalist.cover_image || 'https://via.placeholder.com/800x400?text=No+Image'} 
                alt={currentFijalist.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold">{currentFijalist.title}</h1>
                
                {/* add to collection button for logged in users */}
                {user && (
                  isInCollection ? (
                    <div className="flex flex-col items-end">
                      <button
                        disabled
                        className="px-4 py-2 bg-purple-100 text-purple-700 rounded-md flex items-center cursor-default"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        In Collection
                      </button>
                      <span className="text-xs text-gray-500 mt-1">
                        {collectionNames.length === 1 
                          ? `In ${collectionNames[0]}`
                          : `In ${collectionNames.length} collections`}
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={handleAddToCollection}
                      className="px-4 py-2 bg-white border border-purple-500 text-purple-600 rounded-md hover:bg-purple-50 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add to Collection
                    </button>
                  )
                )}
              </div>
              
              {/* tag */}
              {currentFijalist.tags && currentFijalist.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentFijalist.tags.map(tag => (
                    <span 
                      key={tag.id}
                      className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
              
              <p className="text-gray-600 mb-6">{currentFijalist.description}</p>
              
              {/* main list */}
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap">{currentFijalist.content}</div>
              </div>
            </div>
          </div>
        </section>

        {/* related lists section */}
        {relatedLists.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Related Lists</h2>
            
            <MasonryGrid 
              items={relatedLists} 
              onItemClick={handleRelatedListClick}
            />
          </section>
        )}
      </div>
      
      {/* modal for previewing related lists */}
      <Modal 
        isOpen={isPreviewOpen} 
        onClose={handleClosePreview}
        title="List Preview"
      >
        {selectedFijalist && (
          <FijalistPreview 
            fijalist={selectedFijalist} 
            onClose={handleClosePreview} 
          />
        )}
      </Modal>

      {/* add to collection modal */}
      {currentFijalist && (
        <AddToCollectionModal
          fijalist={currentFijalist}
          isOpen={showCollectionModal}
          onClose={handleCloseCollectionModal}
          onSuccess={handleCollectionAddSuccess}
        />
      )}
      
      {/* toast notif */}
      <Toast
        message={toast.message}
        isVisible={toast.visible}
        onClose={handleCloseToast}
        type="success"
      />
    </main>
  );
} 
