import React, { useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
};

const AddTabModal: React.FC<Props> = ({ isOpen, onClose, onAdd }) => {
  const [tabName, setTabName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tabName.trim()) {
      onAdd(tabName.trim());
      setTabName('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-lg font-semibold mb-4">Add New Tab</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            placeholder="Tab Name"
            value={tabName}
            onChange={(e) => setTabName(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTabModal;
