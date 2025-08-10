import React from 'react';
import { useTranslation } from 'react-i18next';
import DesktopOnly from '@/common/components/utils/DesktopOnly';
import MobileOnly from '@/common/components/utils/MobileOnly';
import { useNavigate } from 'react-router';
import ReactGA from 'react-ga4';
import styled from 'styled-components';

const DesktopContainer = styled.div`
  --width: 700px;
  --aspect-ratio: calc(1920 / 1080);
  width: var(--width);
  height: calc(var(--width) / var(--aspect-ratio));
  background-color: var(--color-section-background, #ffffff);
  border-radius: var(--section-border-radius, 6px) var(--section-border-radius, 6px) 0 0;
  transition: filter 0.1s ease-in-out;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--section-border-radius, 6px) var(--section-border-radius, 6px) 0 0;
  }

  &:hover {
    cursor: pointer;
    filter: brightness(0.95);
  }
`;

const MobileContainer = styled.div`
  --height: min(400px, 100vw);
  --aspect-ratio: calc(1080 / 1397);
  width: calc(var(--height) * var(--aspect-ratio));
  height: var(--height);
  background-color: var(--color-section-background, #ffffff);
  border-radius: var(--section-border-radius, 6px) var(--section-border-radius, 6px) 0 0;
  transition: filter 0.1s ease-in-out;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--section-border-radius, 6px) var(--section-border-radius, 6px) 0 0;
  }

  &:hover {
    cursor: pointer;
    filter: brightness(0.95);
  }
`;

const ltos = (l: string) => (l === 'en' ? 'en' : 'ko');

const CampaignPopupImage: React.FC<{ closePopup: VoidFunction }> = (props) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const [languageUrlPrefix, setLanguageUrlPrefix] = React.useState<string>(ltos(i18n.language));

  i18n.on('languageChanged', (lng) => {
    setLanguageUrlPrefix(ltos(lng));
  });

  const bannerRedirect = () => {
    ReactGA.event({
      category: 'Campaign',
      action: 'click-popup',
    });
    navigate('/eventBanner');
    props.closePopup();
  };

  return (
    <>
      <DesktopOnly>
        <DesktopContainer onClick={() => bannerRedirect()}>
          <img
            alt="OTL"
            src={`https://profill.s3.ap-northeast-2.amazonaws.com/pop-up-image/${languageUrlPrefix}/web.png`}
          />
        </DesktopContainer>
      </DesktopOnly>
      <MobileOnly>
        <MobileContainer onClick={() => bannerRedirect()}>
          <img
            alt="OTL"
            src={`https://profill.s3.ap-northeast-2.amazonaws.com/pop-up-image/${languageUrlPrefix}/mobile.png`}
          />
        </MobileContainer>
      </MobileOnly>
    </>
  );
};

export default CampaignPopupImage;
