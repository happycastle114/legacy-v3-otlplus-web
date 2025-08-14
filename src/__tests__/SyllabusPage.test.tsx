import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@/test-utils';
import SyllabusPage from '@/pages/SyllabusPage';

const rootReducer = (state: any) => state;
const createStore = (preloadedState: any) =>
  configureStore({ reducer: rootReducer as any, preloadedState });

describe('SyllabusPage', () => {
  it('renders', () => {
    const preloaded = {
      common: { user: { user: { id: 1, my_timetable_lectures: [] } } },
    } as any;
    const store = createStore(preloaded);

    render(
      <Provider store={store}>
        <SyllabusPage />
      </Provider>,
    );
  });
});
