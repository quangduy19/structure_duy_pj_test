import React from "react";
import styled from "styled-components";

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  font-height: 36px;
`;

interface TitlePageProps {
  children: any;
}

const TitlePage: React.FC<TitlePageProps> = ({ children }) => {
  return <Title>{children}</Title>;
};

export default TitlePage;
