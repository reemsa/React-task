import Alert, { AlertColor } from "@mui/material/Alert";

interface ToasterProps {
  severity: AlertColor;
  message?: string;
}

export function Toaster({ severity, message = "Error" }: ToasterProps) {
  return (
    <Alert variant="filled" severity={severity}>
      {message}
    </Alert>
  );
}
