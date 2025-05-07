import { useContext } from "react";
import { ConsfigPanalContext } from "../Context/ConfigPanelContext";
import { ICONS } from "../Icons";
import { RenderAdvancedEditor } from "./AdvanceEditor";
import { RenderDesignEditor } from "./RenderDesingEditor";

export const ConfigPanel = () => {
  const { selectedItem, onClose, activeTab, setActiveTab } =
    useContext(ConsfigPanalContext);

  if (!selectedItem) return null;

  const getComponentColor = () => {
    switch (selectedItem.name) {
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
    <div className="fixed top-0 right-0 w-72 h-screen bg-white border-l border-gray-200 z-20 shadow-lg animate-slideInRight overflow-auto">
      {/* Sticky header */}
      <div className="sticky top-0 bg-white z-10 border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <div
              className="w-7 h-7 rounded flex items-center justify-center text-white font-semibold"
              style={{
                backgroundColor: getComponentColor(),
              }}
            >
              {ICONS[selectedItem.name]}
            </div>
            <h2 className="ml-2 text-sm font-medium text-gray-800">
              {selectedItem.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-100 text-gray-500"
            title="Close panel"
          >
            ✖️
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between px-2 bg-gray-50 border-t border-gray-200">
          <button
            className={`flex-1 py-2 text-sm font-medium transition-all ${
              activeTab === "design"
                ? "text-blue-600 border-b-2 border-blue-600 bg-white"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("design")}
          >
            Design
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium transition-all ${
              activeTab === "advanced"
                ? "text-blue-600 border-b-2 border-blue-600 bg-white"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("advanced")}
          >
            Advanced
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="p-4 space-y-6">
        {activeTab === "design" ? (
          <RenderDesignEditor />
        ) : (
          <RenderAdvancedEditor />
        )}
      </div>
    </div>
  );
};
