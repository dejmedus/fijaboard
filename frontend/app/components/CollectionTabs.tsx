import React, { useState, useMemo, useEffect } from "react";
import MasonryGrid from "./MasonryGrid";
import type { Fijalist, Collection } from "~/lib/types";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import AddTabModal from "./AddCollection";
import EditCollectionModal from "./EditCollection";
import useData from "../hooks/useData";
import useAuth from "../hooks/useAuth"; // Import the useAuth hook

interface CollectionTabsProps {
  items: Fijalist[];
  activeCollectionTab: number;
  setActiveCollectionTab: (index: number) => void;
  onItemClick: (item: Fijalist) => void;
  lastItemRef?: (node: HTMLDivElement | null) => void;
}

const CollectionTabs: React.FC<CollectionTabsProps> = ({
  items,
  activeCollectionTab,
  setActiveCollectionTab,
  onItemClick,
}) => {
  const { user } = useAuth(); // Access user info from context
  const { collections, collectionNames } = useData();

  const [filteredItems, setFilteredItems] = useState<Fijalist[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);

  useEffect(() => {
    if (activeCollectionTab === 0) {
      setFilteredItems(items);
      return;
    }

    if (!collections || !collections.length) {
      setFilteredItems([]);
      return;
    }

    const selectedCollection = collections[activeCollectionTab - 1];

    setFilteredItems(selectedCollection?.fijalists || []);
  }, [items, activeCollectionTab, collections]);

  // Infinite Scroll logic
  const {
    displayedItems: itemsForGrid,
    loading,
    lastItemRef,
  } = useInfiniteScroll<Fijalist>({
    items: filteredItems,
    pageSize: 10,
  });

  // handdl for opening the edit modal
  const handleEditClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation(); 
    if (index > 0 && collections && collections[index - 1]) {
      setSelectedCollection(collections[index - 1]);
      setIsEditModalOpen(true);
    }
  };

  // get collection description for a given index
  const getCollectionDescription = (index: number): string | null => {
    if (index === 0 || !collections || !collections[index - 1]) return null;
    return collections[index - 1].description || null;
  };

  return (
    <div className="relative">
      {/* Tabs */}
      <div className="flex flex-wrap gap-6 mb-6 px-4">
        {collectionNames.map((collectionTab, index) => {
          const description = getCollectionDescription(index);
          
          return (
            <div
              key={index}
              className="flex flex-col"
            >
              <div className="flex items-center">
                <div
                  className={`text-xl font-semibold cursor-pointer transition-all ${
                    activeCollectionTab === index
                      ? "text-blue-600 border-b-4 border-blue-600" // underline effect for active tab
                      : "text-gray-600 hover:text-blue-600 hover:border-b-4 hover:border-blue-300"
                  }`}
                  onClick={() => setActiveCollectionTab(index)}
                >
                  {collectionTab}
                </div>
                
                {/* show edit button for user's collections (not the "All" tab) */}
                {user && index > 0 && (
                  <button
                    onClick={(e) => handleEditClick(e, index)}
                    className="ml-2 text-sm text-gray-400 hover:text-blue-600"
                    title="Edit collection"
                  >
                    ✎
                  </button>
                )}
              </div>
              
              {/* description display */}
              {description && (
                <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">
                  {description}
                </div>
              )}
            </div>
          );
        })}

        {/* Show "+" button only if user is logged in */}
        {user && (
          <div
            className="text-xl font-semibold cursor-pointer text-green-500 hover:text-green-600 transition-all"
            onClick={() => setIsAddModalOpen(true)} // open the add modal
          >
            +
          </div>
        )}
      </div>

      {/* Masonry grid without a box, directly integrated */}
      <section className="flex flex-wrap gap-4 px-4 mb-4">
        <MasonryGrid
          items={itemsForGrid}
          onItemClick={onItemClick}
          lastItemRef={lastItemRef}
        />
      </section>

      {/* Loading state when fetching new items */}
      {loading && <div className="text-center py-4">Loading...</div>}

      {/* Add Tab Modal */}
      <AddTabModal
        isOpen={isAddModalOpen} // pass the state to the modal
        onClose={() => {
          setActiveCollectionTab(collectionNames.length);
          setIsAddModalOpen(false);
        }} // Close the modal
      />

      {/* edit collection modal */}
      <EditCollectionModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCollection(null);
        }}
        collection={selectedCollection}
      />
    </div>
  );
};

export default CollectionTabs;
