import React, { useState } from 'react';
import AddTabModal from './AddCollection';
import MasonryGrid from './MasonryGrid'; // make sure the path is correct
import type { Fijalist } from '~/lib/types';

interface CollectionTabsProps {
  items: Fijalist[];
  onItemClick: (item: Fijalist) => void;
}

const CollectionTabs: React.FC<CollectionTabsProps> = ({ items, onItemClick }) => {
  const [tabs, setTabs] = useState<string[]>(['Tab 1', 'Tab 2']);
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTab = (name: string) => {
    setTabs([...tabs, name]);
    setActiveTab(tabs.length);
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full border ${
              activeTab === index
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-50'
            } transition`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
        <button
          className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Tab
        </button>
      </div>

      <div className="p-4 border rounded bg-gray-50">
        {/* Here's the actual MasonryGrid instead of just text */}
        <MasonryGrid 
          items={items} 
          onItemClick={onItemClick} 
        />
      </div>

      <AddTabModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTab}
      />
    </div>
  );
};

export default CollectionTabs;
