import dayjs from "dayjs";
import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import httpJob from "../../apis/apiJob";
import { GlobalLoadingContext } from "../../components/GlobalLoading";
import JobForm, {
  JobFormData,
  JobFormRef,
} from "../../components/JobForm/JobForm";
import { Page } from "../../components/Page";
import { RouterPath } from "../../constant";
import { STATUS_API } from "../../enums";
import { Job__DetailResponse } from "../../types";

interface JobNewProps {}

const JobNew: React.FC<JobNewProps> = ({}) => {
  const formRef = useRef<JobFormRef | null>(null);
  const navigate = useNavigate();
  const { loading } = useContext(GlobalLoadingContext);

  const onSubmit = async (p: JobFormData) => {
    const unloading = loading("Loading Create job...");
    const result: Job__DetailResponse = await httpJob.createJob({
      title: p.title,
      description: p.description,
      expiryDate: dayjs(p.expiryDate).toISOString(),
    });
    unloading();
    if (result.status === STATUS_API.OK) {
      formRef?.current?.onReset();
      navigate(RouterPath.jobs);
    }
  };
  return (
    <Page pageTitle="Job New">
      <JobForm ref={formRef} model={null} onSubmit={onSubmit} />
    </Page>
  );
};

export default JobNew;
