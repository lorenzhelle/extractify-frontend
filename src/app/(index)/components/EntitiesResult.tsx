import React, { use, useEffect, useState } from "react";
import Monaco from "./Monaco";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "@radix-ui/react-icons";
import KeyValuePairsVisualization from "./KeyValuePairsVisualization";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface KeyValuePair {
  attribute: string;
  value: string;
}

export const EntitiesResult = ({
  entities,
}: {
  entities: Record<string, unknown>;
}) => {
  const jsonString = JSON.stringify(entities, null, 2);
  const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(
    jsonString
  )}`;

  const [selectedTab, setSelectedTab] = useState("json");

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };
  // Check if entities has a 'segments' property that's an array (for query_segmentation task)
  const hasSegments = Array.isArray(entities.segments);

  useEffect(() => {
    if (hasSegments) {
      setSelectedTab("visualization");
    }
  }, [hasSegments]);

  return (
    <div className="mt-4 border border-gray-300 rounded-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Recognized Entities
        </h3>
        <Button variant="outline" type="button">
          <DownloadIcon className="w-4 h-4 mr-2" />
          <a href={dataUri} download="entities.json">
            Download JSON
          </a>
        </Button>
      </div>

      <Tabs
        value={selectedTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="mb-4">
          {hasSegments && (
            <TabsTrigger value="visualization">Visualization</TabsTrigger>
          )}
          <TabsTrigger value="json">Raw JSON</TabsTrigger>
        </TabsList>

        <TabsContent value="json">
          <Monaco
            language="json"
            value={jsonString}
            options={{ readOnly: true }}
            onChange={() => {}}
          />
        </TabsContent>

        {hasSegments && (
          <TabsContent value="visualization">
            <KeyValuePairsVisualization
              pairs={entities.segments as KeyValuePair[]}
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};
