import { entityLinking } from "@/app/api/entity-linking/action";
import { useState } from "react";
import { useSetupStore } from "../store";

export const useInference = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<{
    status: "success" | "warning" | "error";
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [entities, setEntities] = useState<Record<string, unknown> | null>(
    null
  );
  const [buttonState, setButtonState] = useState<
    "idle" | "checking" | "linking" | "done"
  >("idle");

  const { LLM: selectedLLM, jsonSchema } = useSetupStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setEntities(null);
    setButtonState("checking");
    setResult(null);
    try {
      setButtonState("linking");
      if (!selectedLLM) {
        throw new Error("LLM not selected");
      }
      const entityData = await entityLinking(query, jsonSchema, selectedLLM);
      setEntities(entityData);
      setButtonState("done");
    } catch (error) {
      console.error("Error in inference:", error);

      setResult({
        status: "error",
        message:
          "Error in inference: " +
          (error instanceof Error ? error.message : String(error)),
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => setButtonState("idle"), 1000);
    }
  };

  return {
    query,
    setQuery,
    result,
    isLoading,
    entities,
    buttonState,
    handleSubmit,
    selectedLLM,
    jsonSchema,
  };
};
