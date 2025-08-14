import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

interface IPopupMenuProps {
  onDoNotShow: VoidFunction;
  onClose: VoidFunction;
}

const PopupMenuContainer = styled.div`
  padding: 5px;
  display: flex;
  justify-content: space-between;
  border-radius: 0 0 var(--section-border-radius, 6px) var(--section-border-radius, 6px);
  background-color: var(--color-section-background, #ffffff);

  & button {
    width: 100%;
    flex-shrink: 1;
    padding: 10px;
    text-align: center;
  }
`;

const Button = styled.button`
  border-radius: 2px;
  &:hover {
    background: #22222211;
  }
`;

const Divider = styled.div`
  border-right: solid 1px var(--color-divider-line, #e5e5e5);
`;

const DoNotShowAgain: React.FC<{ onClick: VoidFunction }> = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <Button onClick={(e) => props.onClick()}>
      <p>{t('ui.bannerPopup.close')}</p>
    </Button>
  );
};

const CloseButton: React.FC<{ onClick: VoidFunction }> = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <Button onClick={(e) => props.onClick()}>
      <p>{t('ui.bannerPopup.doNotShowAgain')}</p>
    </Button>
  );
};

const PopupMenu: React.FC<IPopupMenuProps> = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <PopupMenuContainer>
      <DoNotShowAgain onClick={props.onDoNotShow} />
      <Divider />
      <CloseButton onClick={props.onClose} />
    </PopupMenuContainer>
  );
};

export default PopupMenu;
