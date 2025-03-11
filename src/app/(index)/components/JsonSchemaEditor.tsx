"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import React, { useCallback, useEffect, useState } from "react";
import { useSetupStore } from "../lib/store";
import Monaco from "./Monaco";
import { tasks } from "./TaskSelection";
import { DEFAULT_JSON_SCHEMA, MONACO_DEFAULT_OPTIONS } from "../lib/constants";

const JsonSchemaEditor: React.FC = () => {
  const [jsonInput, setJsonInput] = useState("");
  const { setJsonSchema, jsonSchema, task } = useSetupStore();
  const [directSchema, setDirectSchema] = useState(
    jsonSchema !== "" ? jsonSchema : DEFAULT_JSON_SCHEMA
  );
  const [activeTab, setActiveTab] = useState<string>("direct");

  const isCustomSchema = task === "custom_schema";

  // Update schema when task changes
  useEffect(() => {
    if (task) {
      const defaultSchema = tasks.find((t) => t.id === task)?.defaultSchema;
      setDirectSchema(defaultSchema || "");
      setJsonSchema(defaultSchema || "");
    }
  }, [task, setJsonSchema]);

  const transformer = useCallback(
    async (value: string) => {
      try {
        const { run } = await import("json_typegen_wasm");
        const result = run(
          "Root",
          value,
          JSON.stringify({
            output_mode: "json_schema",
          })
        );
        setJsonSchema(result);
      } catch (error) {
        console.error("Error transforming JSON:", error);
        setJsonSchema("Error: Invalid JSON input");
      }
    },
    [setJsonSchema]
  );

  const handleJsonInputChange = (value: string | undefined) => {
    if (value) {
      setJsonInput(value);
      transformer(value);
    }
  };

  const handleDirectSchemaChange = (value: string | undefined) => {
    if (value) {
      setDirectSchema(value);
      setJsonSchema(value);
    }
  };

  const handleTabChange = (value: string) => {
    if (value === "infer" && !isCustomSchema) {
      return;
    }
    setActiveTab(value);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <p className="text-sm text-gray-600 mb-4">
        Choose how you want to create your JSON schema used to identify and link
        entities in your document. The predefined tasks have a default schema
        which can be adapted to your use case.
      </p>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="direct">Enter Schema Directly</TabsTrigger>
        <TabsTrigger
          value="infer"
          disabled={!isCustomSchema}
          className={cn(!isCustomSchema && "opacity-50 cursor-not-allowed")}
        >
          Infer from JSON
        </TabsTrigger>
      </TabsList>
      <TabsContent value="direct">
        <div className="w-full border border-gray-300 rounded-md p-4">
          <label
            htmlFor="direct-schema"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            JSON Schema
          </label>
          <Monaco
            language="json"
            value={directSchema}
            onChange={handleDirectSchemaChange}
            height="300px"
            options={MONACO_DEFAULT_OPTIONS}
          />
        </div>
      </TabsContent>
      <TabsContent value="infer">
        <div className="flex flex-col space-y-4">
          <div className="w-full border border-gray-300 rounded-md p-4">
            <label
              htmlFor="json-input"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Source JSON
            </label>
            <Monaco
              language="json"
              value={jsonInput}
              onChange={handleJsonInputChange}
              height="300px"
              options={MONACO_DEFAULT_OPTIONS}
            />
          </div>
          <div className="w-full border border-gray-300 rounded-md p-4">
            <label
              htmlFor="json-schema"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Inferred JSON Schema
            </label>
            <Monaco
              language="json"
              value={jsonSchema}
              onChange={(schema) => setJsonSchema(schema || "")}
              height="300px"
              options={{
                ...MONACO_DEFAULT_OPTIONS,
                readOnly: true,
              }}
            />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default JsonSchemaEditor;
