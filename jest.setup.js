import '@testing-library/jest-dom';
import axios from 'axios';

// Mock i18n
// eslint-disable-next-line no-undef
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
        language: 'ko',
      },
    };
  },

  withTranslation: () => (Component) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => '' };
    return Component;
  },
}));

axios.defaults.baseURL = 'http://localhost';

// Prevent real HTTP requests in tests
try {
  // eslint-disable-next-line no-undef
  jest.spyOn(axios, 'get').mockResolvedValue({ data: [] });
  // eslint-disable-next-line no-undef
  jest.spyOn(axios, 'post').mockResolvedValue({ data: {} });
  // eslint-disable-next-line no-undef
  jest.spyOn(axios, 'create').mockReturnValue({ get: jest.fn().mockResolvedValue({ data: [] }) } as any);
} catch (e) {
  // ignore in environments where jest is not initialized yet
}
