import React from "react";
import { Task } from "../../lib/store";
import { Button } from "@/components/ui/button";

const EXAMPLE_QUERIES: Record<Task, string[]> = {
  query_category: [
    "Show me questions about database administration",
    "I need help with Ubuntu installation",
    "I want to go to new york next summer",
  ],
  query_segmentation: [
    "Find hotels in Paris with free wifi",
    "Show me red shoes under $50",
    "Iphone 15 pro in black",
    "Restaurants with outdoor seating that serve Italian food",
  ],
  out_of_domain: [
    "What's the weather like today?",
    "I am looking for a new Iphone 16.",
    "When comes the next season of Lord of the Rings?",
    "Who won the last World Cup?",
    "How much is Photoshop per month for a student?",
    "I have troubles with my Adobe creative cloud subscription",
  ],
  custom_schema: [
    "Extract entities from this custom input",
    "Parse this text according to my schema",
    "Identify the relevant fields in this content",
  ],
};

interface ExampleQueriesProps {
  task: Task | null;
  onSelectQuery: (query: string) => void;
}

const ExampleQueries: React.FC<ExampleQueriesProps> = ({
  task,
  onSelectQuery,
}) => {
  if (!task) return null;

  const queries = EXAMPLE_QUERIES[task] || [];

  if (queries.length === 0) return null;

  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2">
        {queries.map((query, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            type="button" // Explicitly set type to button to prevent form submission
            onClick={() => onSelectQuery(query)}
            className="text-xs"
          >
            {query}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ExampleQueries;
