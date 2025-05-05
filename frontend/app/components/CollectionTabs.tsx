import React, { useState, useMemo, useEffect } from "react";
import MasonryGrid from "./MasonryGrid";
import type { Fijalist } from "~/lib/types";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import AddTabModal from "./AddCollection";
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

    if (selectedCollection?.fijalists) {
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
    } else {
      setFilteredItems([]);
    }
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

  const handleViewCollection = () => {
    const selectedCollection = collections[activeCollectionTab - 1];
    if (selectedCollection?.fijalists) {
      setFilteredItems(selectedCollection.fijalists); // Show only items in the collection
      setShowFullCollection(true); // Set flag to show full collection
    }
  };

  return (
    <div className="relative">
      {/* Tabs */}
      <div className="flex flex-wrap gap-6 mb-6 px-4">
        {collectionNames.map((collectionTab, index) => (
          <div
            key={index}
            className={`text-xl font-semibold cursor-pointer transition-all ${
              activeCollectionTab === index
                ? "text-blue-600 border-b-4 border-blue-600" // Underline effect for active tab
                : "text-gray-600 hover:text-blue-600 hover:border-b-4 hover:border-blue-300"
            }`}
            onClick={() => setActiveCollectionTab(index)}
          >
            {collectionTab}
          </div>
        ))}

        {/* Show "+" button only if user is logged in */}
        {user && (
          <div className="relative group">
            <div
              className="text-xl font-semibold cursor-pointer text-green-500 hover:text-green-600 transition-all"
              onClick={() => setIsModalOpen(true)}
            >
              +
            </div>
            <div className="absolute hidden group-hover:block bg-gray-800 text-white text-sm px-2 py-1 rounded whitespace-nowrap left-1/2 transform -translate-x-1/2 bottom-full ml-15">
              Add a collection tab
            </div>
          </div>
        )}
      </div>
      {/* Collections Tab Container */}

      {activeCollectionTab > 0 && collections?.[activeCollectionTab - 1] && (
        <div className="px-4 mb-4 flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm">
          <div className="text-lg font-medium text-blue-800">
            🌟 {collections[activeCollectionTab - 1].name} (
            {collections[activeCollectionTab - 1]?.fijalists?.length}{" "}
            {collections[activeCollectionTab - 1]?.fijalists?.length === 1
              ? "list"
              : "lists"})
          </div>
          <button
            onClick={handleViewCollection} // Trigger collection view
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-md transition"
          >
            View Collection
          </button>
        </div>
      )}

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
        isOpen={isModalOpen} // Pass the state to the modal
        onClose={() => {
          setActiveCollectionTab(collectionNames.length);
          setIsModalOpen(false);
        }} // Close the modal
      />
    </div>
  );
};

export default CollectionTabs;
