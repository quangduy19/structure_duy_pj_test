import React, { useMemo } from "react";
import { Layout, Menu } from "antd";
import styled from "styled-components";
import { Nav } from "../types";
import { RouterPath } from "../constant";
import { NavLink } from "react-router-dom";

const { Header } = Layout;

const HeaderBase = styled(Header)``;

interface HeaderComponentProps {}

const HeaderComponent: React.FC<HeaderComponentProps> = ({}) => {
  const navs = useMemo<Nav[]>(() => {
    return [
      {
        title: "Jobs",
        link: RouterPath.jobs,
      },
      {
        title: "Job New",
        link: RouterPath.jobNew,
      },
    ];
  }, []);
  return (
    <HeaderBase>
      <Menu mode="horizontal">
        {navs.map((item, index) => (
          <Menu.Item key={index}>
            <NavLink to={item.link}>{item.title}</NavLink>
          </Menu.Item>
        ))}
      </Menu>
    </HeaderBase>
  );
};

export default HeaderComponent;
