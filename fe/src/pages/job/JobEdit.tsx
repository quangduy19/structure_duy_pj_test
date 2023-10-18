import dayjs from "dayjs";
import { omit } from "lodash";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import httpJob from "../../apis/apiJob";
import { GlobalLoadingContext } from "../../components/GlobalLoading";
import JobForm, {
  JobFormData,
  JobFormRef,
} from "../../components/JobForm/JobForm";
import { Page } from "../../components/Page";
import { STATUS_API } from "../../enums";
import { Job, Job__DetailResponse } from "../../types";

interface JobEditProps {}

const JobEdit: React.FC<JobEditProps> = ({}) => {
  const { id } = useParams();
  const { loading } = useContext(GlobalLoadingContext);

  const formRef = useRef<JobFormRef | null>(null);
  const [model, setModel] = useState<JobFormData | null>(null);

  const formatJobData = (val: Job | null): JobFormData | null => {
    return val
      ? omit(
          {
            ...val,
            description: val?.description || "",
            expiryDate: dayjs(val.expiryDate),
          },
          ["id", "createdAt"]
        )
      : null;
  };

  const getJobDetail = async (id: number) => {
    const unloading = loading("Loading Get job detail...");
    const result: Job__DetailResponse = await httpJob.getJobDetail({ id: id });
    if (result.status === STATUS_API.OK) {
      setModel(formatJobData(result.data));
    }
    unloading();
  };

  const onSubmit = async (p: JobFormData) => {
    const unloading = loading("Loading Update job detail...");
    const result: Job__DetailResponse = await httpJob.updateJob({
      id: Number(id),
      title: p.title,
      description: p.description,
      expiryDate: dayjs(p.expiryDate).toISOString(),
    });
    if (result.status === STATUS_API.OK) {
      formRef?.current?.onReset();
      setModel(formatJobData(result.data));
    }
    unloading();
  };

  useEffect(() => {
    const _id = Number(id);
    if (_id) {
      getJobDetail(_id);
    }
  }, [id]);

  return (
    <Page pageTitle="Job Edit">
      <JobForm model={model} onSubmit={onSubmit} />
    </Page>
  );
};

export default JobEdit;
