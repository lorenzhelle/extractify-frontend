import React from "react";
import Monaco from "./Monaco";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "@radix-ui/react-icons";

export const EntitiesResult = ({
  entities,
}: {
  entities: Record<string, unknown>;
}) => {
  const jsonString = JSON.stringify(entities, null, 2);
  const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(
    jsonString
  )}`;

  return (
    <div className="mt-4 border border-gray-300 rounded-md p-4">
      <div className="flex justify-between items-center mb-2">
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
      <Monaco
        language="json"
        value={JSON.stringify(entities, null, 2)}
        options={{ readOnly: true }}
        onChange={() => {}}
      />
    </div>
  );
};
