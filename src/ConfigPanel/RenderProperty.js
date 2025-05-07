import React from "react";
const RenderPropertySection = ({ title, children }) => (
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
