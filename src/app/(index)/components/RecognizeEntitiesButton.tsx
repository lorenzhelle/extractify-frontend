import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type ButtonState = "idle" | "checking" | "linking" | "done";

interface RecognizeEntitiesButtonProps {
  isLoading: boolean;
  buttonState: ButtonState;
  disabled: boolean;
}

const RecognizeEntitiesButton: React.FC<RecognizeEntitiesButtonProps> = ({
  isLoading,
  buttonState,
  disabled,
}) => {
  return (
    <Button
      type="submit"
      className={cn(
        "w-full py-2 transition-colors relative overflow-hidden",
        buttonState !== "idle" && "cursor-not-allowed"
      )}
      disabled={isLoading || disabled || buttonState !== "idle"}
    >
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity",
          buttonState === "idle" ? "opacity-0" : "opacity-100"
        )}
      >
        <span className="animate-pulse">
          {buttonState === "checking" && "Checking if out-of-domain..."}
          {buttonState === "linking" && "Linking entities..."}
          {buttonState === "done" && "Done!"}
        </span>
      </span>
      <span
        className={cn(
          "transition-opacity",
          buttonState === "idle" ? "opacity-100" : "opacity-0"
        )}
      >
        Recognize Entities
      </span>
    </Button>
  );
};

export default RecognizeEntitiesButton;
