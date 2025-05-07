import React, { useEffect, useState } from "react";
import { DragDropContext } from "./ComponentItem";
import { DropWrapper } from "./DropWrapper";
import { ICONS } from "./Icons";

export const DropCanvas = ({
  layoutData,
  setLayoutData,
  onSelectItem,
  selectedPath,
}) => {
  const { draggedItem } = React.useContext(DragDropContext);
  const [isOver, setIsOver] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (draggedItem) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [draggedItem]);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);

    // Don't handle drop if it was inside a child component
    if (e.target !== e.currentTarget) return;

    if (!draggedItem?.name) return;

    let newItem;

    if (draggedItem.name === "Grid") {
      newItem = {
        name: "Grid",
        children: Array.from({ length: 2 }, () => ({
          name: "Row",
          children: Array.from({ length: 2 }, () => ({
            name: "Cell",
            children: [],
          })),
        })),
      };
    } else {
      newItem = {
        name: draggedItem.name,
        text:
          draggedItem.name === "Text"
            ? "Edit me"
            : draggedItem.name === "Header"
            ? "Header Text"
            : draggedItem.name === "Button"
            ? "Click Me"
            : undefined,
        src:
          draggedItem.name === "Image" ? "/api/placeholder/400/320" : undefined,
        fontSize: draggedItem.name === "Header" ? 24 : 16,
        backgroundColor: "#ffffff",
        shadow: false,
        color: "#000000",
      };
    }

    setLayoutData([...layoutData, newItem]);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="absolute inset-0 p-6 pl-20 pr-0 pt-12 overflow-auto bg-yellow-300"
      style={{
        minHeight: "100vh",
        background: isOver ? "#EFF6FF" : "#F8FAFC",
        backgroundImage:
          "linear-gradient(rgba(100, 100, 100, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 100, 100, 0.1) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      {draggedItem && (
        <div
          className="fixed pointer-events-none z-50 opacity-80 flex items-center justify-center p-2 bg-blue-100 border border-blue-500 rounded shadow-md"
          style={{
            left: mousePos.x + 10,
            top: mousePos.y + 10,
            width: "auto",
            padding: "4px 8px",
          }}
        >
          <span className="text-blue-600 mr-1">{ICONS[draggedItem.name]}</span>
          <span className="text-blue-600 text-xs">{draggedItem.name}</span>
        </div>
      )}

      {layoutData.map((item, idx) => (
        <DropWrapper
          key={idx}
          item={item}
          path={[idx]}
          layoutData={layoutData}
          setLayoutData={setLayoutData}
          onSelectItem={onSelectItem}
          selectedPath={selectedPath}
        />
      ))}
    </div>
  );
};
