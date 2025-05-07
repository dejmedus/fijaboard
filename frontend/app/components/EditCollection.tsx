import { useState, useRef, useEffect } from "react";
import useData from "../hooks/useData";
import Modal from "./Modal";
import type { Collection } from "~/lib/types";

type EditCollectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  collection: Collection | null;
};

const EditCollectionModal: React.FC<EditCollectionModalProps> = ({ 
  isOpen, 
  onClose, 
  collection 
}) => {
  const { updateCollection, deleteCollection } = useData();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    
    if (collection) {
      setName(collection.name);
      setDescription(collection.description || "");
    }
    
    // reset delete confirmation when modal opens/closes
    setShowDeleteConfirm(false);
  }, [isOpen, collection]);

  const handleUpdate = async () => {
    if (!collection || !collection.id) return;
    
    const success = await updateCollection(
      String(collection.id),
      {
        ...collection,
        name: name.trim(),
        description: description.trim()
      }
    );
    
    if (success) {
      onClose();
    }
  };
  
  const handleDelete = async () => {
    if (!collection || !collection.id) return;
    
    const success = await deleteCollection(String(collection.id));
    
    if (success) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Collection">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Collection Name
          </label>
          <input
            id="name"
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Collection Name"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description (Optional)
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Collection Description"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        
        {!showDeleteConfirm ? (
          <div className="flex justify-between gap-2">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete Collection
            </button>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={!name.trim()}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete this collection? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default EditCollectionModal; 
