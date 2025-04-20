import { useState } from "react";
import useData from "../hooks/useData";
import type { Fijalist } from "~/lib/types";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import MasonryGrid from "../components/MasonryGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import Modal from "../components/Modal";
import FijalistPreview from "../components/FijalistPreview";

export default function Catalog() {
  const { fijalists, isLoading } = useData();
  const [viewMode, setViewMode] = useState("grid"); // grid or map view
  
  // modal state
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedFijalist, setSelectedFijalist] = useState<Fijalist | null>(null);
  
  // open preview modal with selected fijalist
  const handleFijalistClick = (fijalist: Fijalist) => {
    setSelectedFijalist(fijalist);
    setIsPreviewOpen(true);
  };
  
  // close the preview modal
  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };
  
  const { 
    displayedItems: items, 
    loading, 
    lastItemRef 
  } = useInfiniteScroll<Fijalist>({
    items: fijalists,
    pageSize: 10
  });

  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-7xl mx-auto px-4 py-4">
        {/* search/filter bar */}
        <header className="flex items-center justify-between mb-4">
          {/* search bar */}
          <form role="search" className="relative flex-1 max-w-xl">
            <label htmlFor="search-input" className="sr-only">
              Search lists
            </label>
            <input
              id="search-input"
              type="search"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute left-3 top-2.5" aria-hidden="true">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </form>

          {/* view controls */}
          <nav
            className="flex items-center space-x-4"
            aria-label="View options"
          >
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                aria-pressed={viewMode === "grid"}
                className={`p-2 rounded-lg ${
                  viewMode === "grid" ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("map")}
                aria-label="Map view"
                aria-pressed={viewMode === "map"}
                className={`p-2 rounded-lg ${
                  viewMode === "map" ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
              >
                <svg
                  className="h-5 w-5"
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
              </button>
            </div>
          </nav>
        </header>

        {/* filter nav */}
        <nav
          className="flex space-x-2 mb-6 overflow-x-auto pb-2"
          aria-label="List filters"
        >
          <button
            role="tab"
            aria-selected="false"
            className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-full hover:bg-gray-200"
          >
            Filters
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-full hover:bg-gray-200">
            Trip Length
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-full hover:bg-gray-200">
            Budget
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-full hover:bg-gray-200">
            Season
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-full hover:bg-gray-200">
            Expert Endorsed
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-full hover:bg-gray-200">
            Local Favourite
          </button>
        </nav>

        {/* create new collection button */}
        <button
          className="w-full mb-6 px-4 py-3 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 flex items-center justify-center"
          aria-label="Create new collection"
        >
          <svg
            className="h-5 w-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Create New Collection
        </button>

        {/* show message when no items are available */}
        {!isLoading && items.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex justify-center items-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">No Lists Available</h2>
            <p className="text-gray-600 mb-6">
              No fijalists have been created yet. Click the button above to create one!
            </p>
          </div>
        )}

        {/* main masonry grid */}
        {items.length > 0 && (
          <section aria-label="List grid">
            <MasonryGrid 
              items={items} 
              lastItemRef={lastItemRef} 
              onItemClick={handleFijalistClick}
            />
          </section>
        )}

        {/* loading state */}
        {loading && <LoadingSpinner />}
      </section>
      
      {/* fijalist preview modal */}
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
