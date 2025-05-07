import React, { useState } from "react";
import { ICONS, Tooltip } from "./Icons";

export const DragDropContext = React.createContext({
  draggedItem: null,
  setDraggedItem: () => {},
});

export const ComponentItem = ({ name }) => {
  const { setDraggedItem } = React.useContext(DragDropContext);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", name);
    e.dataTransfer.effectAllowed = "copy";
    setDraggedItem({ name });
    setIsHovered(false);
    setIsDragging(true);

    // Use a transparent image as drag feedback
    const img = new Image();
    img.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // Small delay to ensure drop handler runs first
    setTimeout(() => setDraggedItem(null), 10);
  };

  // Define component-specific colors
  const getComponentColor = () => {
    switch (name) {
      case "Text":
        return "rgb(76, 175, 80)";
      case "Header":
        return "rgb(156, 39, 176)";
      case "Button":
        return "rgb(33, 150, 243)";
      case "Image":
        return "rgb(255, 152, 0)";
      case "Grid":
        return "rgb(244, 67, 54)";
      default:
        return "rgb(158, 158, 158)";
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full h-12 p-1 rounded-md flex flex-col items-center justify-center transition-all duration-150 
              ${
                isDragging
                  ? "opacity-50 scale-95"
                  : isHovered
                  ? "scale-105"
                  : ""
              }
              ${isHovered ? "bg-gray-700" : "bg-gray-800"}`}
      style={{ cursor: "grab" }}
    >
      <div
        className="flex items-center justify-center w-8 h-8 rounded"
        style={{
          backgroundColor: `${getComponentColor()}20`,
          color: getComponentColor(),
        }}
      >
        {ICONS[name]}
      </div>
      <span className="text-xs text-gray-400">{name}</span>
    </div>
  );
};
