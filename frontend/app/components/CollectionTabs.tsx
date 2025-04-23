import React, { useState } from 'react';
import AddTabModal from './AddCollection';

const CollectionTabs: React.FC = () => {
  const [tabs, setTabs] = useState<string[]>(['Tab 1', 'Tab 2']);
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTab = (name: string) => {
    setTabs([...tabs, name]);
    setActiveTab(tabs.length); 
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded ${
              activeTab === index ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
        <button
          className="px-4 py-2 rounded bg-green-500 text-white"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Tab
        </button>
      </div>
      <div className="p-4 border rounded bg-gray-50">
        <p>Content of <strong>{tabs[activeTab]}</strong></p>
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
