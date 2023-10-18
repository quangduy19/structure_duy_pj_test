import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { RouterPath } from "../constant";
import JobEdit from "../pages/job/JobEdit";
import JobList from "../pages/job/JobList";
import JobNew from "../pages/job/JobNew";

interface RouterBaseProps {}

const RedirectComponent = ({ path = "/jobs" }: { path?: string }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(path);
  }, [navigate, path]);
  return <></>;
};

const RouterBase: React.FC<RouterBaseProps> = ({}) => {
  return (
    <Routes>
      <Route path="/" element={<RedirectComponent />} />
      <Route path={RouterPath.jobs} element={<JobList />} />
      <Route path={RouterPath.jobNew} element={<JobNew />} />
      <Route path={RouterPath.jobEdit} element={<JobEdit />} />
    </Routes>
  );
};

export default RouterBase;
