import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "antd";
import { Dayjs } from "dayjs"; // Import dayjs
import React, {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
} from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { ReadonlyProps } from "../../types";
import { GridLayout } from "../GridLayout/GridLayout";
import { defaultFormValues } from "./helpers/defaultFormValues";
import { validationSchema } from "./helpers/validationSchema";
import useUseGetJobFormComponents from "./useGetJobFormComponents";

interface JobFormProps {
  model: JobFormData | null;
  onSubmit: (p: JobFormData) => void;
}

export interface JobFormData {
  title: string;
  description: string;
  expiryDate: Dayjs | null;
}

export interface JobFormRef {
  onReset: () => void;
}

const JobForm = forwardRef(
  (props: ReadonlyProps<JobFormProps>, ref: ForwardedRef<JobFormRef>) => {
    const methods = useForm<JobFormData>({
      resolver: yupResolver(validationSchema),
      defaultValues: defaultFormValues,
    });
    const { handleSubmit, reset } = methods;

    useImperativeHandle(
      ref,
      () => ({
        onReset: () => reset(defaultFormValues),
      }),
      []
    );

    useEffect(() => {
      if (props.model) {
        reset(props.model);
      }
    }, [props.model]);

    return (
      <FormProvider {...methods}>
        <Form onFinish={handleSubmit(props.onSubmit)} layout="vertical">
          <JobFormBody />
        </Form>
      </FormProvider>
    );
  }
);

const JobFormBody: React.FC = () => {
  console.log("aaa", useFormContext());
  const components = useUseGetJobFormComponents();
  return (
    <GridLayout
      schema={{
        defaultItemBreakpoints: {
          lg: 8,
          md: 12,
        },
        gridItems: [
          components.TitleInput,
          components.DescriptionInput,
          components.ExpiredDatePicker,
          {
            topSpace: "1rem",
            isVisible: () => true,
            component: components.SubmitButton,
          },
        ],
      }}
    />
  );
};

export default JobForm;
