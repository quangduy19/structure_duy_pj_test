import { Layout } from "antd";
import styled from "styled-components";
import GlobalLoading from "./components/GlobalLoading";
import Header from "./components/Header";
import RouterBase from "./router";

const { Content } = Layout;

const LayoutWrapper = styled(Layout)``;

const ContentWrapper = styled(Content)``;

function App() {
  return (
    <GlobalLoading>
      <LayoutWrapper>
        <Header />
        <ContentWrapper>
          <RouterBase />
        </ContentWrapper>
      </LayoutWrapper>
    </GlobalLoading>
  );
}

export default App;
