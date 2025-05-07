import React, { useState } from "react";
import { ComponentItem } from "./ComponentItem";
import { IconLayers, IconSettings, IconShare } from "./Icons";

const TABS = ["Layout", "Basic", "Form"];

const COMPONENTS = [
  { name: "Grid", category: "Layout" },
  { name: "Row", category: "Layout" },
  { name: "Text", category: "Basic" },
  { name: "Header", category: "Basic" },
  { name: "Image", category: "Basic" },
  { name: "Button", category: "Basic" },
  { name: "Input", category: "Form" },
  { name: "Radio", category: "Form" },
  { name: "Select", category: "Form" },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [activeTab, setActiveTab] = useState("Basic");

  const categorized = COMPONENTS.filter((comp) => comp.category === activeTab);

  return (
    <div
      className={`fixed top-0 left-0 h-full ${
        collapsed ? "w-20" : "w-72"
      } bg-gradient-to-b from-[#1f1f1f] to-[#121212] backdrop-blur-md border-r border-gray-800 text-white transition-all duration-300 z-20 flex flex-col shadow-xl`}
    >
      {/* Toggle and Title */}
      <div
        onClick={() => setCollapsed(!collapsed)}
        className={`flex items-center ${
          collapsed ? "justify-center" : "justify-between"
        } px-4 py-3 border-b border-gray-700 cursor-pointer hover:bg-gray-800`}
      >
        <div className="flex items-center gap-2">
          <IconLayers />
          {!collapsed && (
            <div className="text-sm font-semibold tracking-wide">
              Components
            </div>
          )}
        </div>
        {!collapsed && (
          <span className="text-gray-400 hover:text-white">
            {collapsed ? "→" : "←"}
          </span>
        )}
      </div>

      {/* Tabs */}
      {!collapsed && (
        <div className="flex px-2 justify-between mt-3 bg-gray-800/60 py-1 mx-2 rounded-md shadow-inner">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 text-xs px-3 py-2 rounded transition-all ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                  : "text-gray-400 hover:bg-gray-700"
              }`}
            >
              {tab === "Layout" && "📐"}
              {tab === "Basic" && "🔧"}
              {tab === "Form" && "📝"}
              <span>{tab}</span>
            </button>
          ))}
        </div>
      )}

      {/* Component Items */}
      <div className="flex-1 overflow-y-auto mt-4 px-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        <div
          className={`grid ${
            collapsed ? "grid-cols-1 gap-2 items-center" : "grid-cols-3 gap-3"
          }`}
        >
          {categorized.map((comp) => (
            <div className="animate-fadeIn" key={comp.name}>
              <ComponentItem name={comp.name} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      {!collapsed && (
        <div className="p-3 border-t border-gray-700 space-y-2">
          <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-xs font-medium shadow-sm transition-colors">
            📤 Export JSON
          </button>
          <button className="w-full py-2 bg-red-600 hover:bg-red-700 rounded text-xs font-medium shadow-sm transition-colors">
            ♻️ Reset
          </button>
        </div>
      )}

      {/* Collapsed Footer */}
      {collapsed && (
        <div className="mt-auto mb-3 flex flex-col items-center space-y-2">
          <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer">
            <IconSettings />
          </div>
          <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer">
            <IconShare />
          </div>
        </div>
      )}
    </div>
  );
};
