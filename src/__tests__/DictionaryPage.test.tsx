import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@/test-utils';
import DictionaryPage from '@/pages/DictionaryPage';

const rootReducer = (state: any) => state;
const createStore = (preloadedState: any) =>
  configureStore({ reducer: rootReducer as any, preloadedState });

describe('DictionaryPage', () => {
  it('renders without crash', () => {
    const preloaded = {} as any;
    const store = createStore(preloaded);

    render(
      <Provider store={store}>
        <DictionaryPage />
      </Provider>,
    );
  });
});
