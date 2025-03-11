import { create } from "zustand";
import { LLMModel } from "./constants";

export type Task =
  | "query_category"
  | "query_segmentation"
  | "out_of_domain"
  | "custom_schema";

interface SetupState {
  LLM: LLMModel | "";
  jsonSchema: string;
  task: Task | null;
  setLLM: (llm: LLMModel) => void;
  setJsonSchema: (jsonSchema: string) => void;
  setTask: (task: Task) => void;
  outOfDomainCheck: boolean;
  setOutOfDomainCheck: (value: boolean) => void;
  domainDefinition: string;
  setDomainDefinition: (definition: string) => void;
}

export const useSetupStore = create<SetupState>((set) => ({
  LLM: "",
  jsonSchema: "",
  task: null,
  setLLM: (llm) => set({ LLM: llm }),
  setJsonSchema: (jsonSchema) => set({ jsonSchema }),
  setTask: (task) => set({ task }),
  outOfDomainCheck: false,
  setOutOfDomainCheck: (value) => set({ outOfDomainCheck: value }),
  domainDefinition: "",
  setDomainDefinition: (definition) => set({ domainDefinition: definition }),
}));
