import React from 'react';
import styled from 'styled-components';

const DesktopOnlyWrapper = styled.div`
  @media (max-aspect-ratio: calc(4/3)) {
    display: none;
  }
`;

const DesktopOnly: React.FC<React.PropsWithChildren> = (props) => {
  return <DesktopOnlyWrapper>{props.children}</DesktopOnlyWrapper>;
};

export default DesktopOnly;
