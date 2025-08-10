import React from 'react';
import { useTranslation } from 'react-i18next';

import { appBoundClassNames as classNames } from '../common/boundClassNames';

const getMessageName = (matchMessage) => {
  const messageName = {
    'invalid-login': 'invalidLogin',
    'no-such-user': 'noSuchUser',
    'problem-unregister': 'problemUnregister',
  }[matchMessage];
  return messageName ?? 'unknown';
};

const ErrorPage = (props) => {
  const { t } = useTranslation();
  const { match } = props;

  const messageName = getMessageName(match.params.message);

  const title = t(`ui.error.${messageName}.title`);
  const message = t(`ui.error.${messageName}.message`);

  return (
    <section className={classNames('content', 'content--no-scroll')}>
      <div className={classNames('page-grid', 'page-grid--full')}>
        <div className={classNames('section')}>
          <div className={classNames('subsection', 'subsection--error')}>
            <div>{title}</div>
            <div>{message}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
