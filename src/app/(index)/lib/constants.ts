import { Task } from "./store";

export type LLMModel =
  | "GPT3"
  | "GPT4_TURBO"
  | "GPT4_O"
  | "GPT4_O_MINI"
  | "CLAUDE_OPUS"
  | "CLAUDE_SONNET"
  | "MISTRAL_LARGE"
  | "MISTRAL_SMALL"
  | "MISTRAL_MIXTRAL_8x22B"
  | "GOOGLE_GEMINI_PRO"
  | "LLAMA_3_8B"
  | "LLAMA_3_70B";

export const LLM_MODELS: LLMModel[] = [
  "GPT3",
  "GPT4_TURBO",
  "GPT4_O",
  "GPT4_O_MINI",
  "CLAUDE_OPUS",
  "CLAUDE_SONNET",
  "MISTRAL_LARGE",
  "MISTRAL_SMALL",
  "MISTRAL_MIXTRAL_8x22B",
  "GOOGLE_GEMINI_PRO",
  "LLAMA_3_8B",
  "LLAMA_3_70B",
];

export const DEFAULT_SCHEMAS: Record<Task, string> = {
  query_category: JSON.stringify(
    {
      name: "entity_linking",
      description: "Extract fitting values for the filter from the query",
      parameters: {
        title: "Intent Category Linking",
        type: "object",
        properties: {
          category: {
            type: "string",
            enum: [
              "stats",
              "dba",
              "askubuntu",
              "gaming",
              "travel",
              "apple",
              "electronics",
              "english",
              "security",
              "physics",
              "gis",
              "scifi",
              "worldbuilding",
              "diy",
            ],
          },
        },
        required: ["category"],
      },
    },
    null,
    2
  ),
  query_segmentation: JSON.stringify(
    {
      name: "query_segmentation",
      description: "Identify attribute-value pairs in the query",
      parameters: {
        title: "Query Segmentation",
        type: "object",
        properties: {
          segments: {
            type: "array",
            items: {
              type: "object",
              properties: {
                attribute: {
                  type: "string",
                  description: "The attribute name",
                },
                value: {
                  type: "string",
                  description: "The value for the attribute",
                },
              },
              required: ["attribute", "value"],
            },
          },
        },
        required: ["segments"],
      },
    },
    null,
    2
  ),
  out_of_domain: JSON.stringify(
    {
      name: "out_of_domain_detection",
      description: "Detect if a query is outside of the supported domain",
      parameters: {
        title: "Out of Domain Detection",
        type: "object",
        properties: {
          is_out_of_domain: {
            type: "boolean",
            description: "Whether the query is outside the supported domain",
          },
          confidence: {
            type: "number",
            description: "Confidence score between 0 and 1",
            minimum: 0,
            maximum: 1,
          },
          reason: {
            type: "string",
            description:
              "Explanation for why the query is considered out of domain",
          },
        },
        required: ["is_out_of_domain"],
      },
    },
    null,
    2
  ),
  custom_schema: JSON.stringify(
    {
      $schema: "http://json-schema.org/draft-07/schema#",
      title: "Custom Schema",
      type: "object",
      properties: {},
      required: [],
    },
    null,
    2
  ),
};
