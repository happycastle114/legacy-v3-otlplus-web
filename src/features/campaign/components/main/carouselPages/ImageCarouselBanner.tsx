import React from 'react';
import { useNavigate } from 'react-router';
import { DeviceType, detectDeviceType } from '@/common/utils/detectDeviceType';
import ReactGA from 'react-ga4';
import styled from 'styled-components';

type ICta = {
  link?: string;
  cta?: string;
  imageUrl?: string;
};

interface IImageCarouselBannerProps {
  trackingId: string;
  language?: string;
  ifAndroid?: ICta;
  ifIOS?: ICta;
  ifMacOS?: ICta;
  ifWindows?: ICta;
  ifDefault: Required<ICta>;
}

const ContainerExternal = styled.div`
  width: 100%;
  height: 50%;
  position: relative;

  @media (max-aspect-ratio: calc(4/3)) {
    height: 180px;
  }

  &:hover {
    cursor: pointer;
  }

  &:hover .cta {
    opacity: 100%;
    transform: translateY(0);
  }

  &:hover .container {
    filter: brightness(0.9);
    scale: 1.02;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  filter: brightness(1) blur(0);
  transition:
    filter 0.3s ease-in-out,
    scale 0.8s ease-in-out;
  background-color: var(--color-section-background, #ffffff);

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    @media (max-aspect-ratio: calc(4/3)) {
      object-fit: contain;
    }
  }
`;

const ContainerLinkCover = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  transition: height 0.3s ease;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: var(--section-padding, 12px);
`;

const ContainerCta = styled.div`
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 5px 10px;
  opacity: 0;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  transform: translateY(4px);

  & > p {
    color: var(--color-highlight, #e54c65);
  }
`;

const ImageCarouselBanner: React.FC<IImageCarouselBannerProps> = (props) => {
  const [url, setUrl] = React.useState<string>(props.ifDefault.link);
  const [cta, setCta] = React.useState<string>(props.ifDefault.cta);
  const [imageUrl, setImageUrl] = React.useState<string>(props.ifDefault.imageUrl);

  const navigate = useNavigate();

  React.useEffect(() => {
    const deviceType = detectDeviceType();
    switch (deviceType) {
      case DeviceType.android:
        if (props.ifAndroid === undefined) break;
        setUrl(props.ifAndroid.link ?? props.ifDefault.link);
        setCta(props.ifAndroid.cta ?? props.ifDefault.cta);
        setImageUrl(props.ifAndroid.imageUrl ?? props.ifDefault.imageUrl);
        break;
      case DeviceType.ios:
        if (props.ifIOS === undefined) break;
        setUrl(props.ifIOS.link ?? props.ifDefault.link);
        setCta(props.ifIOS.cta ?? props.ifDefault.cta);
        setImageUrl(props.ifIOS.imageUrl ?? props.ifDefault.imageUrl);
        break;
      case DeviceType.macos:
        if (props.ifMacOS === undefined) break;
        setUrl(props.ifMacOS.link ?? props.ifDefault.link);
        setCta(props.ifMacOS.cta ?? props.ifDefault.cta);
        setImageUrl(props.ifMacOS.imageUrl ?? props.ifDefault.imageUrl);
        break;
      case DeviceType.windows:
        if (props.ifWindows === undefined) break;
        setUrl(props.ifWindows.link ?? props.ifDefault.link);
        setCta(props.ifWindows.cta ?? props.ifDefault.cta);
        setImageUrl(props.ifWindows.imageUrl ?? props.ifDefault.imageUrl);
        break;
    }
  }, [props.language]);

  return (
    <ContainerExternal
      onClick={() => {
        ReactGA.event({
          category: 'Campaign',
          action: 'carousel-click',
          label: props.trackingId,
        });
        if (url.startsWith('/')) navigate(url);
        else window.open(url, '_blank');
      }}>
      <Container className="container" id="test">
        <img src={imageUrl} alt="banner" />
      </Container>
      {/* <ContainerLinkCover>
        <ContainerCta className="cta">
          <p>{cta}</p>
        </ContainerCta>
      </ContainerLinkCover> */}
    </ContainerExternal>
  );
};

export default ImageCarouselBanner;
