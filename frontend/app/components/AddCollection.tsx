import { useState, useRef, useEffect } from "react";
import useData from "../hooks/useData";
import Modal from "./Modal";

type AddTabModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddTabModal: React.FC<AddTabModalProps> = ({ isOpen, onClose }) => {
  const { addCollection } = useData();
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleAdd = () => {
    setName("");
    addCollection({
      name: name.trim(),
      is_private: false,
      fijalists: [],
      description: "",
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Collection">
      <div className="space-y-4">
        <input
          ref={inputRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Collection Name"
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddTabModal;
