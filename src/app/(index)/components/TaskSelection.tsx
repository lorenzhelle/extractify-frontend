import { cn } from "@/lib/utils";
import {
  CheckIcon,
  TagIcon,
  ScissorsIcon,
  SearchIcon,
  FileJsonIcon,
} from "lucide-react";
import React from "react";
import { Task, useSetupStore } from "../lib/store";
import { DEFAULT_SCHEMAS, ALTERNATIVE_SCHEMAS } from "../lib/constants";

export const tasks: {
  id: Task;
  title: string;
  description: string;
  icon: React.ReactNode;
  defaultSchema: string;
  schemas: { label: string; value: string }[];
}[] = [
  {
    id: "query_category",
    title: "Query Category Classification",
    description: "Classify queries into predefined categories",
    icon: <TagIcon className="h-6 w-6" />,
    defaultSchema: DEFAULT_SCHEMAS["query_category"],
    schemas: [
      {
        label: "Category Classification",
        value: DEFAULT_SCHEMAS["query_category"],
      },
      {
        label: "Category Classification More Categories",
        value: ALTERNATIVE_SCHEMAS["query_category"],
      },
    ],
  },
  {
    id: "query_segmentation",
    title: "Query Segmentation",
    description: "Identify matching attribute value pairs in queries",
    icon: <ScissorsIcon className="h-6 w-6" />,
    defaultSchema: DEFAULT_SCHEMAS["query_segmentation"],
    schemas: [
      {
        label: "Basic Query Segmentation",
        value: DEFAULT_SCHEMAS["query_segmentation"],
      },
      {
        label: "Multimedia Products Query Segmentation (German)",
        value: ALTERNATIVE_SCHEMAS["query_segmentation"],
      },
    ],
  },
  {
    id: "out_of_domain",
    title: "Out of Domain Detection",
    description: "Identify queries outside your domain",
    icon: <SearchIcon className="h-6 w-6" />,
    defaultSchema: DEFAULT_SCHEMAS["out_of_domain"],
    schemas: [
      {
        label: "Out of Domain Detection",
        value: DEFAULT_SCHEMAS["out_of_domain"],
      },
    ],
  },
  {
    id: "custom_schema",
    title: "Custom Schema",
    description: "Define your own extraction schema",
    icon: <FileJsonIcon className="h-6 w-6" />,
    defaultSchema: DEFAULT_SCHEMAS["custom_schema"],
    schemas: [
      {
        label: "Empty Schema",
        value: DEFAULT_SCHEMAS["custom_schema"],
      },
    ],
  },
];

const TaskSelection: React.FC = () => {
  const task = useSetupStore((state) => state.task);
  const setTask = useSetupStore((state) => state.setTask);
  const setJsonSchema = useSetupStore((state) => state.setJsonSchema);

  const handleTaskSelection = (selectedTask: Task) => {
    setTask(selectedTask);
    // Set the default schema for the selected task
    setJsonSchema(DEFAULT_SCHEMAS[selectedTask]);
  };

  return (
    <div className="w-full space-y-4">
      <h2 className="text-md font-medium">Select Query Understanding Task</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tasks.map((item) => (
          <div
            key={item.id}
            className={cn(
              "relative flex flex-col items-center p-6 rounded-lg border-2 cursor-pointer transition-all",
              "hover:border-blue-500 hover:shadow-md",
              task === item.id
                ? "border-blue-500 bg-blue-50 shadow-md"
                : "border-gray-200 bg-white"
            )}
            onClick={() => handleTaskSelection(item.id as Task)}
          >
            {task === item.id && (
              <div className="absolute top-3 right-3 text-blue-500">
                <CheckIcon className="h-5 w-5" />
              </div>
            )}
            <div className="mb-4">{item.icon}</div>
            <h3 className="font-medium text-center">{item.title}</h3>
            <p className="text-sm text-gray-500 text-center mt-2">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskSelection;
