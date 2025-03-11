import React, { useEffect, useState } from "react";
import Monaco from "./Monaco";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "@radix-ui/react-icons";
import KeyValuePairsVisualization from "./KeyValuePairsVisualization";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KeyValuePair } from "../lib/types";

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
  const [keyValuePairs, setKeyValuePairs] = useState<KeyValuePair[]>([]);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  // Extract key-value pairs from the entities object
  useEffect(() => {
    const pairs: KeyValuePair[] = [];

    // Check if entities has a 'segments' property that's an array (for query_segmentation task)
    if (Array.isArray(entities.segments)) {
      setKeyValuePairs(entities.segments as KeyValuePair[]);
      return;
    }

    // For simple JSON objects, extract key-value pairs recursively
    const extractPairs = (obj: Record<string, unknown>, prefix = "") => {
      Object.entries(obj).forEach(([key, value]) => {
        const attributeName = prefix ? `${prefix}.${key}` : key;

        if (
          value !== null &&
          typeof value === "object" &&
          !Array.isArray(value)
        ) {
          // Recursively extract nested objects
          extractPairs(value as Record<string, unknown>, attributeName);
        } else if (
          typeof value === "string" ||
          typeof value === "number" ||
          typeof value === "boolean"
        ) {
          // Add simple key-value pairs
          pairs.push({
            attribute: attributeName,
            value: String(value),
          });
        }
      });
    };

    extractPairs(entities);
    setKeyValuePairs(pairs);
  }, [entities]);

  // Determine if we should show the visualization tab
  const showVisualization = keyValuePairs.length > 0;

  // Set default tab to visualization if key-value pairs are available
  useEffect(() => {
    if (showVisualization) {
      setSelectedTab("visualization");
    }
  }, [showVisualization]);

  return (
    <div className="mt-4 border border-gray-300 rounded-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Recognized Entities
        </h3>
        <Button variant="outline" type="button">
          <DownloadIcon className="w-4 h-4 mr-2" />
          <a href={dataUri} download="entities.json">
            JSON
          </a>
        </Button>
      </div>

      <Tabs
        value={selectedTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="mb-4">
          {showVisualization && (
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

        {showVisualization && (
          <TabsContent value="visualization">
            <KeyValuePairsVisualization pairs={keyValuePairs} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};
