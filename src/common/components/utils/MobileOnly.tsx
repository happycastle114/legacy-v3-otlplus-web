import React from 'react';
import styled from 'styled-components';

const MobileOnlyWrapper = styled.div`
  @media (min-aspect-ratio: calc(4/3)) {
    display: none;
  }
`;

const MobileOnly: React.FC<React.PropsWithChildren> = (props) => {
  return <MobileOnlyWrapper>{props.children}</MobileOnlyWrapper>;
};

export default MobileOnly;
