import React from "react";
import { KeyValuePair } from "../lib/types";
import { ATTRIBUTE_COLORS } from "../lib/constants";

interface KeyValuePairsVisualizationProps {
  pairs: KeyValuePair[];
}

const KeyValuePairsVisualization: React.FC<KeyValuePairsVisualizationProps> = ({
  pairs,
}) => {
  if (!pairs || pairs.length === 0) {
    return <div className="text-gray-500 italic">No key-value pairs found</div>;
  }

  // Generate a unique color for each attribute
  const getAttributeColor = (attribute: string) => {
    // Simple hash function to determine color index
    const index =
      attribute.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
      ATTRIBUTE_COLORS.length;
    return ATTRIBUTE_COLORS[index];
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
        <h3 className="text-sm font-medium text-gray-500 mb-2">
          Entity Value Pairs
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {pairs.map((pair, index) => {
            const colorClass = getAttributeColor(pair.attribute);

            return (
              <div
                key={index}
                className="flex flex-col p-4 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <div className="flex-shrink-0">
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${colorClass}`}
                    >
                      {pair.attribute}
                    </span>
                  </div>
                  <div className="flex-1">
                    <span className="text-lg font-semibold text-gray-800">
                      {pair.value}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KeyValuePairsVisualization;
