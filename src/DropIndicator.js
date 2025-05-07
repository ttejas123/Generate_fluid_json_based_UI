import { ICONS } from "./Icons";

export const DropIndicator = ({ draggedItem }) => {
  if (!draggedItem) return null;

  return (
    <div
      className="pointer-events-none fixed transform -translate-x-1/2 -translate-y-1/2 z-50 opacity-70"
      style={{ top: 0, left: 0, width: "120px", height: "60px" }}
    >
      <div className="bg-blue-100 border-2 border-blue-500 rounded p-2 shadow-md flex items-center justify-center">
        <span className="text-blue-600 mr-2">{ICONS[draggedItem.name]}</span>
        <span className="text-blue-600 text-sm">{draggedItem.name}</span>
      </div>
    </div>
  );
};
