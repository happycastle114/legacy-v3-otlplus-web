import React from 'react';
import { Link } from 'react-router-dom';
import { guidelineBoundClassNames as classNames } from '../../boundClassNames';
import logoImage from '../images/SPARCS_black.svg';
import { CONTACT } from '../../constants';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer>
      <div className={classNames('content')}>
        <div className={classNames('content-left', 'reverse')}>
          <div className={classNames('logo')}>
            <span>
              <a href="http://sparcs.org" target="_blank" rel="noopener noreferrer">
                <img src={logoImage} alt="OTL Logo" />
              </a>
            </span>
          </div>
          <div className={classNames('menus')}>
            <span>
              <Link to="/credits">{t('ui.menu.credit')}</Link>
            </span>
            <span>
              <Link to="/licenses">{t('ui.menu.licences')}</Link>
            </span>
            <span>
              <Link to="/privacy">{t('ui.menu.privacy')}</Link>
            </span>
          </div>
        </div>
        <div className={classNames('contact')}>
          <span>
            <a href={`mailto:${CONTACT}`}>{CONTACT}</a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
