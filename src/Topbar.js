import { useState, useRef } from "react";

export const TopBar = () => {
  const [title, setTitle] = useState("Untitled Design");
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);

  const handleTitleClick = () => {
    setEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0); // Wait for input to mount
  };

  const handleBlur = () => {
    setEditing(false);
    if (!title.trim()) {
      setTitle("Untitled Design");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleBlur();
    }
  };

  return (
    <div className="fixed top-0 left-20 right-0 h-12 bg-white border-b border-gray-200 z-10 flex items-center px-4">
      <div className="text-sm font-medium text-gray-700">
        {editing ? (
          <input
            ref={inputRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        ) : (
          <span
            onClick={handleTitleClick}
            className="cursor-text hover:text-blue-600 transition-colors"
            title="Click to edit title"
          >
            {title}
          </span>
        )}
      </div>

      <div className="flex ml-auto space-x-2">
        <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded transition-colors">
          Preview
        </button>
        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors">
          Save
        </button>
      </div>
    </div>
  );
};
