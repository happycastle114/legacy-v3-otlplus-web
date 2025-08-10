import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@/test-utils';
import MainPage from '@/pages/MainPage';

const rootReducer = (state: any) => state;

const createStore = (preloadedState: any) =>
  configureStore({ reducer: rootReducer as any, preloadedState });

describe('MainPage', () => {
  it('renders and shows load more when user exists', () => {
    const preloaded = {
      common: { user: { user: { id: 1, reviews: [] } }, media: { isPortrait: false } },
    } as any;
    const store = createStore(preloaded);

    render(
      <Provider store={store}>
        <MainPage />
      </Provider>,
    );

    expect(screen.getByText('ui.button.loadMore')).toBeInTheDocument();
  });
});
