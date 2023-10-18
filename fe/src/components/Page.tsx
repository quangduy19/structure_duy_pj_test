import styled from "styled-components";
import TitlePage from "./TitlePage";
import { Spacer } from "./Spacer";

interface PageProps {
  pageTitle: string;
  children: React.ReactNode;
}
export function Page({ pageTitle, children }: PageProps) {
  return (
    <PageContainer>
      <TitlePage>{pageTitle}</TitlePage>
      <Spacer height="1rem" />
      {children}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  padding: 1rem 4rem;
`;
