import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@/test-utils';
import WriteReviewsPage from '@/pages/WriteReviewsPage';

const rootReducer = (state: any) => state;
const createStore = (preloadedState: any) =>
  configureStore({ reducer: rootReducer as any, preloadedState });

describe('WriteReviewsPage', () => {
  it('renders', () => {
    const preloaded = {
      common: { media: { isPortrait: false } },
      writeReviews: { reviewsFocus: { from: 'NONE' } },
    } as any;
    const store = createStore(preloaded);

    render(
      <Provider store={store}>
        <WriteReviewsPage />
      </Provider>,
    );
  });
});
