import React, { useState } from "react";
import { DragDropContext } from "./ComponentItem";

export const updateLayoutAtPath = (layout, path, updateFn) => {
  const copy = JSON.parse(JSON.stringify(layout));
  let target = copy;
  for (let i = 0; i < path.length - 1; i++) {
    if (!target) return layout;
    target = target[path[i]];
  }
  const lastKey = path[path.length - 1];
  if (!target || typeof target[lastKey] !== "object") return layout;
  target[lastKey] = updateFn(target[lastKey]);
  return copy;
};

export const DropWrapper = ({
  item,
  path,
  layoutData,
  setLayoutData,
  onSelectItem,
  selectedPath,
}) => {
  const { draggedItem } = React.useContext(DragDropContext);
  const [isOver, setIsOver] = useState(false);
  const isCell = item.name === "Cell";
  const isEmptyCell = isCell && (!item.children || item.children.length === 0);
  const isSelected =
    selectedPath &&
    path.length === selectedPath.length &&
    path.every((val, index) => val === selectedPath[index]);

  const handleDragOver = (e) => {
    if (!isEmptyCell) return;
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

    if (!draggedItem?.name || !isEmptyCell) return;

    const newItem = {
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

    if (draggedItem.name === "Grid") {
      newItem.children = Array.from({ length: 2 }, () => ({
        name: "Row",
        children: Array.from({ length: 2 }, () => ({
          name: "Cell",
          children: [],
        })),
      }));
    }

    const updated = updateLayoutAtPath(layoutData, path, (target) => {
      const children = target.children || [];
      return { ...target, children: [...children, newItem] };
    });

    setLayoutData(updated);
  };

  if (!item || typeof item !== "object") return null;

  const isRow = item.name === "Row";
  const className = `rounded ${
    isSelected
      ? "ring-2 ring-blue-500"
      : isOver
      ? "border-blue-500 bg-blue-50"
      : isEmptyCell
      ? "border-dashed border-gray-300"
      : "border-transparent"
  } transition-all duration-200 group hover:border-blue-300 hover:bg-blue-50/50`;

  return (
    <div
      onDragOver={isCell ? handleDragOver : undefined}
      onDragLeave={isCell ? handleDragLeave : undefined}
      onDrop={isCell ? handleDrop : undefined}
      onClick={(e) => {
        e.stopPropagation();
        onSelectItem(path, item);
      }}
      className={`${className} ${
        isRow ? "flex gap-2 p-2" : isCell ? "p-4 border" : "p-2"
      }`}
      style={{
        backgroundColor: item.backgroundColor || "transparent",
        cursor: isCell ? "default" : "pointer",
        flex: isCell ? 1 : undefined,
        minHeight: isCell ? "60px" : undefined,
      }}
    >
      {item.name === "Text" && (
        <p
          className={`${item.shadow ? "shadow-md" : ""} p-1 rounded `}
          style={{ fontSize: `${item.fontSize}px`, color: item.color }}
        >
          {item.text}
        </p>
      )}
      {item.name === "Header" && (
        <h2
          className={`font-bold ${item.shadow ? "shadow-md" : ""} p-1 rounded`}
          style={{ fontSize: `${item.fontSize}px`, color: item.color }}
        >
          {item.text}
        </h2>
      )}
      {item.name === "Button" && (
        <button
          className="px-4 py-2 rounded transition-shadow"
          style={{
            backgroundColor: item.backgroundColor || "#3B82F6",
            color: item.color || "#FFFFFF",
            boxShadow: item.shadow ? "0 2px 4px rgba(0,0,0,0.2)" : "none",
            fontSize: `${item.fontSize}px`,
          }}
        >
          {item.text}
        </button>
      )}
      {item.name === "Image" && (
        <img
          src={item.src || "/api/placeholder/400/320"}
          alt="Placeholder"
          className={`max-w-full rounded ${item.shadow ? "shadow-md" : ""}`}
          style={{ border: "1px solid #e2e8f0" }}
        />
      )}
      {isEmptyCell && (
        <div className="flex items-center justify-center w-full h-full text-gray-400">
          <div className="text-center">
            <div className="mb-1">+</div>
            <span className="text-xs">Drop here</span>
          </div>
        </div>
      )}
      {item.children && Array.isArray(item.children) && (
        <div
          className={`${
            item.name === "Row" ? "flex gap-2 w-full" : "space-y-2"
          }`}
        >
          {item.children.map((child, idx) => (
            <DropWrapper
              key={idx}
              item={child}
              path={[...path, "children", idx]}
              layoutData={layoutData}
              setLayoutData={setLayoutData}
              onSelectItem={onSelectItem}
              selectedPath={selectedPath}
            />
          ))}
        </div>
      )}
    </div>
  );
};
