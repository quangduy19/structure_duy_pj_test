import { Button, DatePicker, Form, Input } from "antd";
import { ComponentRenderer } from "../../types";
import { FormItem } from "../FormItem";

interface JobFormComponents {
  TitleInput: ComponentRenderer;
  DescriptionInput: ComponentRenderer;
  ExpiredDatePicker: ComponentRenderer;
  SubmitButton: ComponentRenderer;
}

const useUseGetJobFormComponents = (): JobFormComponents => {
  return {
    TitleInput: () => (
      <FormItem
        label="Title"
        name="title"
        render={({ field }) => <Input {...field} />}
      />
    ),

    DescriptionInput: () => (
      <FormItem
        label="Description"
        name="description"
        render={({ field }) => <Input {...field} />}
      />
    ),

    ExpiredDatePicker: () => (
      <FormItem
        label="Expiry Date"
        name="expiryDate"
        render={({ field: { value, onChange } }) => (
          <DatePicker
            style={{ width: "100%" }}
            value={value}
            onChange={onChange}
          />
        )}
      />
    ),
    SubmitButton: () => (
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    ),
  };
};

export default useUseGetJobFormComponents;
