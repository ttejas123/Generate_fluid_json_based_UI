import { useContext } from "react";
import { ConsfigPanalContext } from "../Context/ConfigPanelContext";
import { updateLayoutAtPath } from "../DropWrapper"; // ensure this is available

export const RenderPropertySection = ({ title, children }) => (
  <div className="mb-6">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {title}
      </h3>
      <span className="text-gray-400">▼</span>
    </div>
    <div className="bg-gray-50 p-3 rounded-md shadow-sm">{children}</div>
  </div>
);

export const RenderAdvancedEditor = () => {
  const {
    selectedItem,
    selectedPath,
    onClose,
    layoutData,
    setLayoutData,
    handleChange,
  } = useContext(ConsfigPanalContext);

  const handleDeleteItem = () => {
    if (selectedPath.length <= 1) {
      const newLayout = [...layoutData];
      newLayout.splice(selectedPath[0], 1);
      setLayoutData(newLayout);
    } else {
      const parentPath = selectedPath.slice(0, -2);
      const parentKey = selectedPath[selectedPath.length - 2];
      const itemIndex = selectedPath[selectedPath.length - 1];

      const updatedLayout = updateLayoutAtPath(
        layoutData,
        parentPath,
        (parent) => {
          const newChildren = [...parent[parentKey]];
          newChildren.splice(itemIndex, 1);
          return { ...parent, [parentKey]: newChildren };
        }
      );

      setLayoutData(updatedLayout);
    }
    onClose();
  };

  return (
    <div className="space-y-6">
      <RenderPropertySection title="Element ID">
        <input
          type="text"
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          value={selectedItem.id || ""}
          onChange={(e) => handleChange("id", e.target.value)}
          placeholder="element-id"
        />
      </RenderPropertySection>

      <RenderPropertySection title="Custom Classes">
        <input
          type="text"
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          value={selectedItem.customClasses || ""}
          onChange={(e) => handleChange("customClasses", e.target.value)}
          placeholder="class1 class2 class3"
        />
      </RenderPropertySection>

      <RenderPropertySection title="Custom Attributes">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="name"
            />
            <span className="text-gray-500">=</span>
            <input
              type="text"
              className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="value"
            />
            <button className="px-2 py-1 bg-gray-200 text-sm text-gray-700 rounded hover:bg-gray-300">
              +
            </button>
          </div>
        </div>
      </RenderPropertySection>

      <RenderPropertySection title="Actions">
        <button
          onClick={handleDeleteItem}
          className="w-full py-2 px-4 bg-red-50 text-red-600 border border-red-200 rounded-md text-sm hover:bg-red-100 transition"
        >
          Delete Element
        </button>
      </RenderPropertySection>
    </div>
  );
};
