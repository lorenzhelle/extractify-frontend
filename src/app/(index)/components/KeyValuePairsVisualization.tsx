import React from "react";

interface KeyValuePair {
  attribute: string;
  value: string;
}

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
    const colors = [
      "bg-blue-100 text-blue-800 border-blue-200",
      "bg-green-100 text-green-800 border-green-200",
      "bg-purple-100 text-purple-800 border-purple-200",
      "bg-yellow-100 text-yellow-800 border-yellow-200",
      "bg-pink-100 text-pink-800 border-pink-200",
      "bg-indigo-100 text-indigo-800 border-indigo-200",
      "bg-red-100 text-red-800 border-red-200",
      "bg-teal-100 text-teal-800 border-teal-200",
    ];

    // Simple hash function to determine color index
    const index =
      attribute.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
      colors.length;
    return colors[index];
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
