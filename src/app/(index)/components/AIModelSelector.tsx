import React from "react";
import { useSetupStore } from "../lib/store";
import { LLMModel, LLM_MODELS } from "../lib/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AIModelSelector: React.FC = () => {
  const LLM = useSetupStore((state) => state.LLM);
  const setLLM = useSetupStore((state) => state.setLLM);

  return (
    <div className="w-full">
      <label
        htmlFor="ai-model"
        className="block text-md font-medium text-gray-700 mb-2"
      >
        Select Foundation Model
      </label>
      <Select value={LLM} onValueChange={(value) => setLLM(value as LLMModel)}>
        <SelectTrigger id="ai-model" className="w-full">
          <SelectValue placeholder="Select an LLM" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {LLM_MODELS.map((model) => (
              <SelectItem key={model} value={model}>
                {model.replace(/_/g, " ")}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AIModelSelector;
