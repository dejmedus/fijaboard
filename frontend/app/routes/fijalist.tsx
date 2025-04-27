import { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router";
import useData from "../hooks/useData";
import type { Fijalist } from "~/lib/types";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import MasonryGrid from "../components/MasonryGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import Modal from "../components/Modal";
import FijalistPreview from "../components/FijalistPreview";
import { saveScrollPosition } from "../hooks/useScrollPosition";

export default function FijalistDetail() {
  const { id } = useParams<{ id: string }>();
  const { fijalists, isLoading } = useData();
  
  const [currentFijalist, setCurrentFijalist] = useState<Fijalist | null>(null);
  
  // modal state for previewing related lists
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedFijalist, setSelectedFijalist] = useState<Fijalist | null>(null);
  
  // handle clicking on a related list
  const handleRelatedListClick = (fijalist: Fijalist) => {
    setSelectedFijalist(fijalist);
    setIsPreviewOpen(true);
  };
  
  // close the preview modal
  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  // get current fijalist based on ID from route params
  useEffect(() => {
    if (id && fijalists.length > 0) {
      // convert id to string for comparison since backend returns numbers but route params are strings
      const fijalist = fijalists.find(item => String(item.id) === id);
      setCurrentFijalist(fijalist || null);
    }
  }, [id, fijalists]);

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

  // use our custom hook for infinite scrolling
  const { 
    displayedItems: relatedLists, 
    loading, 
    lastItemRef 
  } = useInfiniteScroll<Fijalist>({
    items: currentFijalist ? findRelatedLists() : [],
    pageSize: 6
  });

  // handle click on the back button to save scroll position
  const handleBackClick = () => {
    saveScrollPosition("catalog");
  };

  // check if we came from map view
  const cameFromMap = localStorage.getItem('catalogViewMode') === 'map';

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

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* back button */}
        <div className="flex items-center mb-6 gap-4">
          <Link 
            to="/catalog" 
            className="inline-flex items-center text-purple-600 hover:text-purple-800"
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
          
          {/* adding CONDITIONAL "View on Map" button (depending on how the user got there) */}
          {cameFromMap && (
            <Link 
              to="/catalog" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
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
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" 
                />
              </svg>
              View on Map
            </Link>
          )}
        </div>

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
              <h1 className="text-3xl font-bold mb-4">{currentFijalist.title}</h1>
              
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
              lastItemRef={lastItemRef} 
              onItemClick={handleRelatedListClick}
            />
            
            {loading && <LoadingSpinner />}
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
    </main>
  );
} 
