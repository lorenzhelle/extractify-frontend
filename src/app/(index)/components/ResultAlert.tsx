import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export type ResultStatus = "success" | "warning" | "error" | "info";

interface ResultAlertProps {
  status?: ResultStatus;
  message?: string;
}

const ResultAlert: React.FC<ResultAlertProps> = ({ status, message }) => {
  console.log(status, message);
  if (!status || !message) return null;

  const variantMap: Record<ResultStatus, "default" | "destructive"> = {
    success: "default",
    info: "default",
    warning: "destructive",
    error: "destructive",
  };

  return (
    <Alert variant={variantMap[status]}>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default ResultAlert;
