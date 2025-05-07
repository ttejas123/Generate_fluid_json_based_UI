import { useState } from "react";
import { DragDropContext } from "./ComponentItem";
import { ConfigPanel } from "./ConfigPanel/ConfigPanel";
import { ConfigPanalProvider } from "./Context/ConfigPanelContext";
import { DropCanvas } from "./DropCanvas";
import { DropIndicator } from "./DropIndicator";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./Topbar";

export function DropArea() {
  const [selected, setSelected] = useState(null);
  const [selectedPath, setSelectedPath] = useState(null);
  const [layoutData, setLayoutData] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);

  const handleSelectItem = (path, item) => {
    setSelected(item);
    setSelectedPath(path);
  };

  const handleClosePanel = () => {
    setSelected(null);
    setSelectedPath(null);
  };

  return (
    <DragDropContext.Provider value={{ draggedItem, setDraggedItem }}>
      <div className="flex h-screen w-full overflow-hidden bg-gray-100">
        <Sidebar />
        <TopBar />
        <div className="flex-1 relative flex justify-center items-center">
          <DropCanvas
            layoutData={layoutData}
            setLayoutData={setLayoutData}
            onSelectItem={handleSelectItem}
            selectedPath={selectedPath}
          />
        </div>
        {selected && (
          <ConfigPanalProvider
            selectedItem={selected}
            selectedPath={selectedPath}
            onClose={handleClosePanel}
            onUpdate={() => setLayoutData([...layoutData])}
            layoutData={layoutData}
            setLayoutData={setLayoutData}
          />
        )}
        {draggedItem && <DropIndicator draggedItem={draggedItem} />}
      </div>
    </DragDropContext.Provider>
  );
}
