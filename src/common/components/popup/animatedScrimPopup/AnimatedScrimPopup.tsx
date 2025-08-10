import React from 'react';
import ReactDOM from 'react-dom';
import { asyncSleep } from '@/common/utils/asyncSleep';
import { motion } from 'framer-motion';
import { useOnEscape } from '@/common/utils/interaction/useOnKeyPress';
import styled from 'styled-components';

const PopupPortal: React.FC<React.PropsWithChildren> = (props) => {
  const [el, setEl] = React.useState<HTMLDivElement | undefined>();

  React.useEffect(() => {
    const _el = document.createElement('div');
    setEl(_el);
    let modalRoot = document.querySelector(`#popup-root`);
    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', 'popup-root');
      document.body.appendChild(modalRoot);
    }
    modalRoot.appendChild(_el);

    return () => {
      modalRoot && modalRoot.removeChild(_el);
    };
  }, []);

  return el ? ReactDOM.createPortal(props.children, el) : <></>;
};

interface IAnimatedScrimPopupProps {
  isOpen: boolean;
  onClose?: VoidFunction;
  noEscapeKeyBinding?: boolean;
}

const ScrimContainer = styled(motion.div)<{ shouldRender: boolean }>`
  --opacity: 100%;
  z-index: 10000;
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 0;
  background-color: rgba(33, 33, 33, 0.4);
  overflow-y: scroll;
  justify-content: center;
  align-items: center;
  display: ${(p) => (p.shouldRender ? 'flex' : 'none')};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ContainerInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const AnimatedScrimPopup: React.FC<React.PropsWithChildren<IAnimatedScrimPopupProps>> = (props) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const preventRaceConditionID = React.useRef<number>(0);
  const [_isOpen, _setIsOpen] = React.useState(props.isOpen);
  const [animationState, setAnimationState] = React.useState<boolean>(props.isOpen);

  useOnEscape(
    props.noEscapeKeyBinding
      ? () => {
          return;
        }
      : props.onClose ?? (() => {}),
  );

  React.useEffect(() => {
    let mounted = true;
    const myID = ++preventRaceConditionID.current;
    const asyncFun = async () => {
      if (props.isOpen) {
        _setIsOpen(true);
        await asyncSleep(10);
        if (!mounted) return;
        if (preventRaceConditionID.current !== myID) return;
        setAnimationState(true);
        if (document && window) {
          document.body.style.position = 'fixed';
          document.body.style.overflowY = 'scroll';
          document.body.style.top = `-${window.scrollY}px`;
        }
      } else {
        setAnimationState(false);
        await asyncSleep(150);
        if (!mounted) return;
        if (preventRaceConditionID.current !== myID) return;
        _setIsOpen(false);
        if (document && window) {
          document.body.style.position = '';
          document.body.style.top = '';
        }
      }
    };
    asyncFun();

    return () => {
      mounted = false;
    };
  }, [props.isOpen]);

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (props.onClose == null) {
      return;
    }
    if (e.target !== ref.current) {
      return;
    }
    props.onClose();
  };

  return (
    <div>
      <PopupPortal>
        <ScrimContainer
          shouldRender={_isOpen}
          data-testid="popupContainer"
          ref={ref}
          onClick={handleClose}
          key={props.isOpen ? 'open' : 'close'}
          initial={{ opacity: props.isOpen ? 0 : 1 }}
          animate={{ opacity: props.isOpen ? 1 : 0 }}
          transition={{ duration: 0.15 }}>
          <ContainerInner>{props.children}</ContainerInner>
        </ScrimContainer>
      </PopupPortal>
    </div>
  );
};

export default AnimatedScrimPopup;
