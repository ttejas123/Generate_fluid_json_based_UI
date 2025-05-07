import React, { useState } from "react";
import { ConfigPanel } from "../ConfigPanel/ConfigPanel";
import { updateLayoutAtPath } from "../DropWrapper";

export const ConsfigPanalContext = React.createContext({
  selectedItem: null,
  selectedPath: "",
  layoutData: {},
  activeTab: "design",
  onClose: () => {},
  onUpdate: () => {},
  onDelete: () => {},
  setLayoutData: () => {},
  setActiveTab: () => {},
  handleChange: () => {},
});

export const ConfigPanalProvider = (props) => {
  const { selectedPath, layoutData, setLayoutData } = props;
  const [activeTab, setActiveTab] = useState("design");
  const handleChange = (key, value) => {
    const updatedLayout = updateLayoutAtPath(
      layoutData,
      selectedPath,
      (item) => {
        return { ...item, [key]: value };
      }
    );
    setLayoutData(updatedLayout);
  };
  return (
    <ConsfigPanalContext.Provider
      value={{
        ...props,
        activeTab,
        setActiveTab,
        handleChange,
      }}
    >
      <ConfigPanel />
    </ConsfigPanalContext.Provider>
  );
};
