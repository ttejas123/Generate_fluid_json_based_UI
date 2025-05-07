import { useContext } from "react";
import { ConsfigPanalContext } from "../Context/ConfigPanelContext";
import { RenderPropertySection } from "./AdvanceEditor";

export const RenderDesignEditor = () => {
  const { selectedItem, handleChange } = useContext(ConsfigPanalContext);

  const colorSwatches = [
    "#000000",
    "#FFFFFF",
    "#3B82F6",
    "#10B981",
    "#EF4444",
    "#F59E0B",
    "#8B5CF6",
    "#EC4899",
  ];

  const bgSwatches = [
    "#FFFFFF",
    "#F3F4F6",
    "#FEF2F2",
    "#ECFDF5",
    "#EFF6FF",
    "#FDF2F8",
    "#F9FAFB",
    "#F8F4EB",
  ];

  const renderColorPicker = (current, key, swatches) => (
    <>
      <div className="flex items-center bg-white border border-gray-300 rounded p-1 mb-2">
        <div
          className="w-6 h-6 rounded-sm mr-2 cursor-pointer"
          style={{
            backgroundColor: current,
            border: current === "#ffffff" ? "1px solid #e5e5e5" : "none",
          }}
        ></div>
        <input
          type="text"
          className="flex-1 text-xs border-none focus:ring-0 p-1"
          value={current}
          onChange={(e) => handleChange(key, e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {swatches.map((color) => (
          <div
            key={color}
            className={`w-6 h-6 rounded-sm cursor-pointer transition-all ${
              current === color ? "ring-2 ring-blue-500 scale-110" : ""
            }`}
            style={{
              backgroundColor: color,
              border: color === "#FFFFFF" ? "1px solid #e5e5e5" : "none",
            }}
            onClick={() => handleChange(key, color)}
          />
        ))}
      </div>
    </>
  );

  const renderToggleSwitch = (value, onToggle) => (
    <div
      className={`w-9 h-5 rounded-full flex items-center cursor-pointer transition-colors ${
        value ? "bg-blue-500" : "bg-gray-300"
      }`}
      onClick={onToggle}
    >
      <div
        className={`w-4 h-4 rounded-full bg-white shadow transform transition-transform ${
          value ? "translate-x-4" : "translate-x-0.5"
        }`}
        style={{ marginTop: "2px" }}
      ></div>
    </div>
  );

  switch (selectedItem.name) {
    case "Text":
    case "Header":
    case "Button":
      return (
        <div className="space-y-6">
          <RenderPropertySection title="Content">
            <textarea
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={selectedItem.text || ""}
              onChange={(e) => handleChange("text", e.target.value)}
              rows={3}
            />
          </RenderPropertySection>

          <RenderPropertySection title="Typography">
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-600 mb-1 block">
                  Font Size
                </label>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600">
                    {selectedItem.fontSize || 16}px
                  </span>
                </div>
                <input
                  type="range"
                  className="w-full"
                  min="8"
                  max="48"
                  value={selectedItem.fontSize || 16}
                  onChange={(e) =>
                    handleChange("fontSize", parseInt(e.target.value))
                  }
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">
                  Text Color
                </label>
                {renderColorPicker(selectedItem.color, "color", colorSwatches)}
              </div>
            </div>
          </RenderPropertySection>

          <RenderPropertySection title="Background">
            {renderColorPicker(
              selectedItem.backgroundColor,
              "backgroundColor",
              bgSwatches
            )}
          </RenderPropertySection>

          <RenderPropertySection title="Effects">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Shadow</span>
              {renderToggleSwitch(selectedItem.shadow, () =>
                handleChange("shadow", !selectedItem.shadow)
              )}
            </div>
          </RenderPropertySection>
        </div>
      );

    case "Image":
      return (
        <div className="space-y-6">
          <RenderPropertySection title="Image Source">
            <label className="text-xs text-gray-600 mb-1 block">
              Image URL
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={selectedItem.src || ""}
              onChange={(e) => handleChange("src", e.target.value)}
            />
          </RenderPropertySection>

          <RenderPropertySection title="Effects">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Shadow</span>
              {renderToggleSwitch(selectedItem.shadow, () =>
                handleChange("shadow", !selectedItem.shadow)
              )}
            </div>
          </RenderPropertySection>
        </div>
      );

    default:
      return (
        <div className="flex items-center justify-center h-32 text-gray-500">
          No properties available for this element
        </div>
      );
  }
};
