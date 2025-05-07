import React, { useState, useMemo, useEffect } from "react";
import MasonryGrid from "./MasonryGrid";
import type { Fijalist, Collection } from "~/lib/types";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import AddTabModal from "./AddCollection";
import EditCollectionModal from "./EditCollection";
import useData from "../hooks/useData";
import useAuth from "../hooks/useAuth";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFullCollection, setShowFullCollection] = useState(false); // New state to track when to show full collection
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [showFullCollection, setShowFullCollection] = useState(false); // New state to track when to show full collection

  useEffect(() => {
    if (activeCollectionTab === 0) {
      setFilteredItems(items);
      setShowFullCollection(false);
      return;
    }

    if (!collections || !collections.length) {
      setFilteredItems([]);
      return;
    }

    const selectedCollection = collections[activeCollectionTab - 1];

    if (selectedCollection?.fijalists) {

      if (showFullCollection) {
        // Only show items in the collection
        setFilteredItems(selectedCollection.fijalists);
      } else {
        // Step 1: Get all tag IDs from the collection's items
        const collectionTagIDs = selectedCollection.fijalists.flatMap(item =>
          (item.tags || []).map(tag => tag.id)
        );

        // Step 2: Filter global items based on matching tag IDs
        const relatedItems = items.filter(item =>
          item.tags?.some(tag => collectionTagIDs.includes(tag.id))
        );

        // Step 3: Optionally include the collection's items themselves
        const merged = [...selectedCollection.fijalists, ...relatedItems];

        // Step 4: Deduplicate by ID
        const deduped = merged.filter(
          (item, index, self) =>
            index === self.findIndex(i => i.id === item.id)
        );

        setFilteredItems(deduped);
      }
    } else {
      setFilteredItems([]);
    }
  }, [items, activeCollectionTab, collections, showFullCollection]);

  // Infinite Scroll logic
  const {
    displayedItems: itemsForGrid,
    loading,
    lastItemRef,
  } = useInfiniteScroll<Fijalist>({
    items: filteredItems,
    pageSize: 10,
  });

  // Handle viewing only collection items
  const handleViewCollection = () => {
    const selectedCollection = collections[activeCollectionTab - 1];
    if (selectedCollection?.fijalists) {
      setShowFullCollection(true); // Set flag to show full collection
    }
  };

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
            <div key={index} className="flex flex-col">
              <div className="flex items-center">
                <div
                  className={`text-xl font-semibold cursor-pointer transition-all ${
                    activeCollectionTab === index
                      ? "text-blue-600 border-b-4 border-blue-600"
                      : "text-gray-600 hover:text-blue-600 hover:border-b-4 hover:border-blue-300"
                  }`}
                  onClick={() => {
                    setActiveCollectionTab(index);
                    setShowFullCollection(false);
                  }}
                >
                  {collectionTab}
                </div>
  
                {/* Show edit button for user-created collections */}
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
  
              {/* Collection description */}
              {description && (
                <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">
                  {description}
                </div>
              )}
            </div>
          );
        })}
  
        {/* "+" Add tab button if user is logged in */}
        {user && (
          <div className="relative group">
            <div
              className="text-xl font-semibold cursor-pointer text-green-500 hover:text-green-600 transition-all"
              onClick={() => setIsAddModalOpen(true)} // open the add modal
            >
              +
            </div>
            <div className="absolute hidden group-hover:block bg-gray-800 text-white text-sm px-2 py-1 rounded whitespace-nowrap left-1/2 transform -translate-x-1/2 bottom-full ml-15">
              Add a collection tab
            </div>
          </div>
        )}
      </div>
      {/* Active collection info bar */}
      {activeCollectionTab > 0 && collections?.[activeCollectionTab - 1] && (
        <div className="px-4 mb-4 flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm">
          <div className="text-lg font-medium text-blue-800">
            🌟 {collections[activeCollectionTab - 1].name} (
            {collections[activeCollectionTab - 1]?.fijalists?.length}{" "}
            {collections[activeCollectionTab - 1]?.fijalists?.length === 1
              ? "list"
              : "lists"}
            )
          </div>
          <button
            onClick={handleViewCollection}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-md transition"
          >
            View Collection
          </button>
        </div>
      )}

      {/* Masonry grid without a box, directly integrated */}
      <section className="flex flex-wrap gap-4 px-4 mb-4">
        {itemsForGrid.length > 0 ? (
          <MasonryGrid
            items={itemsForGrid}
            onItemClick={onItemClick}
            lastItemRef={lastItemRef}
          />
        ) : (
          <div className="w-full text-center py-8">
            <p className="text-gray-500">No items in this collection</p>
          </div>
        )}
      </section>
  
      {/* Loading state */}
      {loading && <div className="text-center py-4">Loading more items...</div>}
  
      {/* End message */}
      {!loading &&
        itemsForGrid.length > 0 &&
        itemsForGrid.length === filteredItems.length && (
          <div className="text-center py-4 text-gray-500 text-sm">
            You've reached the end
          </div>
        )}
  
      {/* Add Tab Modal */}
      <AddTabModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setActiveCollectionTab(collectionNames.length);
          setIsAddModalOpen(false);
        }}
      />
  
      {/* Edit Collection Modal */}
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
