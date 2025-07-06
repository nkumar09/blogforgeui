import { useState } from "react";

export default function RevisionModal({ onSubmit, onClose }) {
  const [notes, setNotes] = useState("");

  const handleConfirm = () => {
    onSubmit(notes);
    setNotes("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-neutral-900 text-gray-100 rounded-xl w-full max-w-md p-6 shadow-2xl animate-fade-in">
        <h2 className="text-xl font-bold text-blue-300 mb-4">Enter Revision Notes</h2>
        <textarea
          className="w-full h-32 bg-neutral-800 border border-neutral-700 rounded p-3 text-gray-100 outline-none focus:border-blue-500"
          placeholder="E.g., Make it more concise, add a stronger opening..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
            onClick={handleConfirm}
            disabled={!notes.trim()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}