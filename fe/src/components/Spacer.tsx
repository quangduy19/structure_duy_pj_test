import styled from "styled-components";

export interface SpacerProps {
  height?: string;
}

export function Spacer({ height }: SpacerProps): JSX.Element {
  return <StyledSpacer height={height} />;
}

export const StyledSpacer = styled.div<{ height?: string }>`
  margin-bottom: ${({ height }) => height || "2rem"};
`;
