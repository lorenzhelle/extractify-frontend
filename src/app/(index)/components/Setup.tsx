import JsonSchemaEditor from "./JsonSchemaEditor";
import AIModelSelector from "./AIModelSelector";
import TaskSelection from "./TaskSelection";
import { useSetupStore } from "../lib/store";
import { Button } from "@/components/ui/button";

interface SetupProps {
  onComplete: () => void;
}

const Setup: React.FC<SetupProps> = ({ onComplete }) => {
  const handleComplete = () => {
    // You can add any additional logic here if needed
    onComplete();
  };

  const { task, LLM, jsonSchema } = useSetupStore();

  return (
    <div className="w-full space-y-6">
      <TaskSelection />
      <AIModelSelector />
      <JsonSchemaEditor />
      <Button
        onClick={handleComplete}
        className="w-full"
        disabled={!task || !LLM || !jsonSchema}
      >
        Continue to Inference
      </Button>
    </div>
  );
};

export default Setup;
