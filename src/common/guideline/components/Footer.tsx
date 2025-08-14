import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../images/SPARCS_black.svg';
import { CONTACT } from '../../constants';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const FooterWrapper = styled.footer``;

const Content = styled.div`
  color: #333333;
  position: relative;
  background-color: #f9f0f0;
  transition: background-color 0.1s;
`;

const ContentLeft = styled.div`
  display: inline-flex;
  justify-content: space-between;
  width: 50%;
  height: 50px;
  flex-direction: row;
  align-items: center;

  @media (max-aspect-ratio: calc(4/3)) {
    width: 100%;
    height: initial;
    flex-direction: column-reverse;
    align-items: flex-start;
  }
`;

const Logo = styled.div`
  margin: 0 24px;
  img {
    height: 27px;
  }
  @media (max-aspect-ratio: calc(4/3)) {
    margin: 0 16px;
    & > span {
      height: 50px;
    }
  }
`;

const Menus = styled.div`
  flex: 0 1 auto;
  font-size: 15px;
  white-space: nowrap;
  span {
    margin-right: 24px;
    sup {
      line-height: 0;
    }
  }

  @media (max-aspect-ratio: calc(4/3)) {
    width: calc(100% - 34px);
    margin-left: 34px;
    padding-top: 16px;
  }
`;

const Contact = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  height: 50px;
  font-size: 13px;
  display: flex;
  align-items: center;
  & > * {
    margin: 0 24px;
  }
  @media (max-aspect-ratio: calc(4/3)) {
    & > * {
      margin: 0 16px;
    }
  }
`;

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <FooterWrapper>
      <Content>
        <ContentLeft>
          <Logo>
            <span>
              <a href="http://sparcs.org" target="_blank" rel="noopener noreferrer">
                <img src={logoImage} alt="OTL Logo" />
              </a>
            </span>
          </Logo>
          <Menus>
            <span>
              <Link to="/credits">{t('ui.menu.credit')}</Link>
            </span>
            <span>
              <Link to="/licenses">{t('ui.menu.licences')}</Link>
            </span>
            <span>
              <Link to="/privacy">{t('ui.menu.privacy')}</Link>
            </span>
          </Menus>
        </ContentLeft>
        <Contact>
          <span>
            <a href={`mailto:${CONTACT}`}>{CONTACT}</a>
          </span>
        </Contact>
      </Content>
    </FooterWrapper>
  );
};

export default Footer;
