import { Button, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import httpJob from "../../apis/apiJob";
import { GlobalLoadingContext } from "../../components/GlobalLoading";
import { Page } from "../../components/Page";
import { RouterPath } from "../../constant";
import { STATUS_API } from "../../enums";
import {
  Job,
  Job__ListRequest,
  Job__ListResponse,
  TableParams,
} from "../../types";

interface JobListProps {}

const JobList: React.FC<JobListProps> = ({}) => {
  const navigate = useNavigate();
  const { loading } = useContext(GlobalLoadingContext);
  const [datas, setDatas] = useState<Job[]>([
    {
      id: 2,
      title: "Customer Response Strategist",
      expiryDate: "2033-09-24",
      description: "duy ok",
      createdAt: "2023-10-15",
    },
  ]);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 10,
      onChange: (current: number, size: number) => {
        getList({ page: current, limit: size });
      },
    },
  });

  const onEdit = useCallback(
    (val: Job) => {
      // navigate to Edit Page
      navigate(RouterPath.jobEdit.replace(":id", `${val.id}`));
    },
    [navigate]
  );

  const onDelete = useCallback(
    async (val: Job) => {
      // call API delete
      const unloading = loading("Loading deleted job...");
      await httpJob.deleteJob({ id: val.id });
      unloading();
      await getList({
        page: tableParams.pagination?.current || 1,
        limit: tableParams.pagination?.pageSize || 10,
      });
    },
    [tableParams]
  );

  const columns = useMemo<ColumnsType<Job>>(
    () => [
      {
        title: "Title",
        dataIndex: "title",
      },
      {
        title: "Description",
        dataIndex: "description",
      },
      {
        title: "Expired Date",
        dataIndex: "expiryDate",
      },
      {
        title: "Created Date",
        dataIndex: "createdAt",
      },
      {
        title: "",
        key: "operation",
        width: 200,
        render: (value, record) => (
          <Space wrap>
            <Button onClick={() => onEdit(record)}>Edit</Button>
            <Button type="primary" onClick={() => onDelete(record)} danger>
              Delete
            </Button>
          </Space>
        ),
      },
    ],
    [onEdit, onDelete]
  );

  const getList = async (payload: Job__ListRequest) => {
    const unloading = loading("Loading list job...");
    const result: Job__ListResponse = await httpJob.getListJob(payload);

    if (result.status === STATUS_API.OK) {
      setDatas(result.data);
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          current: result.page,
          pageSize: result.limit,
          total: result.total,
        },
      }));
    }

    unloading();
  };

  useEffect(() => {
    getList({
      page: tableParams.pagination?.current || 1,
      limit: tableParams.pagination?.pageSize || 10,
    });
  }, []);

  return (
    <Page pageTitle="Job list">
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={datas}
        pagination={tableParams.pagination}
      />
    </Page>
  );
};

export default JobList;
