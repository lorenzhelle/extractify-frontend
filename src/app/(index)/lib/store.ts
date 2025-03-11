import { create } from "zustand";
import { LLMModel } from "./constants";

export type Task =
  | "query_category"
  | "query_segmentation"
  | "out_of_domain"
  | "custom_schema";

interface SetupState {
  domain: string;
  LLM: LLMModel | "";
  jsonSchema: string;
  task: Task | null;
  setDomain: (domain: string) => void;
  setLLM: (llm: LLMModel) => void;
  setJsonSchema: (jsonSchema: string) => void;
  setTask: (task: Task) => void;
  outOfDomainCheck: boolean;
  setOutOfDomainCheck: (value: boolean) => void;
}

export const useSetupStore = create<SetupState>((set) => ({
  domain: "",
  LLM: "",
  jsonSchema: "",
  task: null,
  setDomain: (domain) => set({ domain }),
  setLLM: (llm) => set({ LLM: llm }),
  setJsonSchema: (jsonSchema) => set({ jsonSchema }),
  setTask: (task) => set({ task }),
  outOfDomainCheck: false,
  setOutOfDomainCheck: (value) => set({ outOfDomainCheck: value }),
}));
