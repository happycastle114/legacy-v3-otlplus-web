import styled from 'styled-components';

interface ISpacerProps {
  height: number;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const SpacerDiv = styled.div`
  width: 100%;
  flex-shrink: 0;
`;

const Spacer: React.FC<ISpacerProps> = (props) => {
  return <SpacerDiv style={{ height: `${props.height}px` }} onClick={props.onClick} />;
};

export default Spacer;
