import React from 'react';
import AnimatedScrimPopup from '../animatedScrimPopup/AnimatedScrimPopup';
import styled from 'styled-components';

const PopupContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
  flex-direction: column;
`;

const PopupBox = styled.div``;

interface IBannerPopupProps {
  popupOpen: boolean;
  setPopupOpen: (popupOpen: boolean) => void;
  footerArea?: React.ReactNode;
}

const BannerPopup: React.FC<React.PropsWithChildren<IBannerPopupProps>> = (props) => {
  return (
    <AnimatedScrimPopup isOpen={props.popupOpen} onClose={() => props.setPopupOpen(false)}>
      <PopupContainer onClick={() => props.setPopupOpen(false)}>
        <PopupBox
          onClick={(e) => {
            e.stopPropagation();
          }}>
          {props.children}
        </PopupBox>
        {props.footerArea}
      </PopupContainer>
    </AnimatedScrimPopup>
  );
};

export default BannerPopup;
