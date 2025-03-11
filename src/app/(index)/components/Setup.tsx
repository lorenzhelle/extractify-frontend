import JsonSchemaEditor from "./JsonSchemaEditor";
import AIModelSelector from "./AIModelSelector";
import TaskSelection from "./TaskSelection";
import { useSetupStore } from "../lib/store";

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
      <button
        onClick={handleComplete}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!task || !LLM || !jsonSchema}
      >
        Continue to Inference
      </button>
    </div>
  );
};

export default Setup;
