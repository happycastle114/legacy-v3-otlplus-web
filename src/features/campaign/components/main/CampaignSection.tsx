import React from 'react';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
import ImageCarouselBanner from './carouselPages/ImageCarouselBanner';
import styled from 'styled-components';

const FullscreenSection = styled.div`
  position: relative;
  background-color: var(--color-section-background, #ffffff);
  border-radius: var(--section-border-radius, 6px);
  box-shadow: var(--section-box-shadow, 0 2px 8px rgba(0, 0, 0, 0.08));
  overflow: hidden;
  margin-bottom: var(--section-margin-bottom, 12px);
  padding: 0;

  :global(.slick-dots) {
    transform: translateY(-30px);
    button::before {
      font-size: 10px;
      color: var(--color-highlight, #e54c65);
    }
    :global(.slick-active) {
      button::before {
        color: var(--color-highlight, #e54c65);
        opacity: 1;
      }
    }
    li {
      margin: 0;
    }
  }
`;

const ltos = (l: string) => (l === 'en' ? 'en' : 'ko');

const CampaignSection: React.FC = () => {
  const { i18n } = useTranslation();

  const [languageUrlPrefix, setLanguageUrlPrefix] = React.useState<string>(ltos(i18n.language));

  i18n.on('languageChanged', (lng) => {
    setLanguageUrlPrefix(ltos(lng));
  });

  return (
    <FullscreenSection>
      <Slider dots={true} arrows={false} infinite speed={800} autoplay={true} autoplaySpeed={8000}>
        <ImageCarouselBanner
          trackingId="app-launch"
          language={languageUrlPrefix}
          ifDefault={{
            imageUrl: `https://profill.s3.ap-northeast-2.amazonaws.com/banner-image/${languageUrlPrefix}/app-launch.png`,
            cta: 'DEPRECATED',
            link: '/eventBanner',
          }}
          ifIOS={{
            link: 'https://apps.apple.com/us/app/otl/id1579878255',
          }}
          ifAndroid={{
            link: 'https://play.google.com/store/apps/details?id=org.sparcs.otlplus',
          }}
        />
        <ImageCarouselBanner
          trackingId="release-note"
          language={languageUrlPrefix}
          ifDefault={{
            imageUrl: `https://profill.s3.ap-northeast-2.amazonaws.com/banner-image/${languageUrlPrefix}/release-note.png`,
            cta: '공지 보기 2',
            link: '/',
          }}
        />
      </Slider>
    </FullscreenSection>
  );
};

export default CampaignSection;
