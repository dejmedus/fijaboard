import React, { useState, useMemo } from 'react';
import MasonryGrid from './MasonryGrid'; 
import type { Fijalist } from '~/lib/types';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import AddTabModal from './AddCollection';
import useAuth from '../hooks/useAuth'; // Import the useAuth hook

interface CollectionTabsProps {
  items: Fijalist[];
  onItemClick: (item: Fijalist) => void;
  lastItemRef?: (node: HTMLDivElement | null) => void; 
}

const CollectionTabs: React.FC<CollectionTabsProps> = ({ items, onItemClick }) => {
  const { user } = useAuth(); // Access user info from context
  const [tabs, setTabs] = useState<string[]>(['All']);
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  // Filter items based on the selected tab
  const filteredItems = useMemo(() => {
    if (activeTab === 0) {
      return items; // "All" tab shows all items
    }
    const activeTabName = tabs[activeTab].toLowerCase();
    
    return items.filter(item => {
      return item.tags?.some(tag => tag.name.toLowerCase() === activeTabName);
    });
  }, [items, activeTab, tabs]);

  const handleAddTab = (name: string) => {
    setTabs([...tabs, name]);
    setActiveTab(tabs.length); // Switch to the newly added tab
  };

  // Infinite Scroll logic
  const { displayedItems: itemsForGrid, loading, lastItemRef } = useInfiniteScroll<Fijalist>({
    items: filteredItems,
    pageSize: 10
  });

  return (
    <div className="relative">
      {/* Tabs */}
      <div className="flex flex-wrap gap-6 mb-6 px-4">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`text-xl font-semibold cursor-pointer transition-all ${
              activeTab === index
                ? 'text-blue-600 border-b-4 border-blue-600' // Underline effect for active tab
                : 'text-gray-600 hover:text-blue-600 hover:border-b-4 hover:border-blue-300'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </div>
        ))}

        {/* Show "+" button only if user is logged in */}
        {user && (
          <div
            className="text-xl font-semibold cursor-pointer text-green-500 hover:text-green-600 transition-all"
            onClick={() => setIsModalOpen(true)} // Open the modal
          >
            + 
          </div>
        )}
      </div>

      {/* Masonry grid without a box, directly integrated */}
      <section className="flex flex-wrap gap-4 px-4 mb-4">
        <MasonryGrid items={itemsForGrid} onItemClick={onItemClick} lastItemRef={lastItemRef} />
      </section>

      {/* Loading state when fetching new items */}
      {loading && <div className="text-center py-4">Loading...</div>}

      {/* Add Tab Modal */}
      <AddTabModal
        isOpen={isModalOpen} // Pass the state to the modal
        onClose={() => setIsModalOpen(false)} // Close the modal
        onAdd={handleAddTab} // Pass the function to add a new tab
      />
    </div>
  );
};

export default CollectionTabs;
