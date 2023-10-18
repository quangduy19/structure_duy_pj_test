import { Form } from "antd";
import { Controller, ControllerProps, useFormContext } from "react-hook-form";
import { FormErrMessage } from "./FormErrMessage";

export interface FormItemProps {
  name: string;
  label: string;
  render: ControllerProps["render"];
  [key: string]: any;
}

export function FormItem({ label, name, render }: FormItemProps) {
  const { formState, control } = useFormContext();
  const error = formState.errors?.[name];

  return (
    <Form.Item
      label={label}
      name={name}
      help={<FormErrMessage message={error?.message} />}
      validateStatus={error ? "error" : ""}
    >
      <Controller name={name} control={control} render={render} />
    </Form.Item>
  );
}
