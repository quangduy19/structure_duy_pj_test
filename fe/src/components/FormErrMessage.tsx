interface FormErrMessageProps {
  message?: any;
}

export function FormErrMessage({ message }: FormErrMessageProps) {
  return <>{message || ""}</>;
}
