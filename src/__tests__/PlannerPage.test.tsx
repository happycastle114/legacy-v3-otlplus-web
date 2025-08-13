import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@/test-utils';
import PlannerPage from '@/pages/PlannerPage';

const rootReducer = (state: any) => state;
const createStore = (preloadedState: any) =>
  configureStore({ reducer: rootReducer as any, preloadedState });

describe('PlannerPage', () => {
  it('renders', () => {
    const preloaded = {
      planner: { planner: { isTrackSettingsSectionOpen: false, selectedPlanner: null } },
    } as any;
    const store = createStore(preloaded);

    render(
      <Provider store={store}>
        <PlannerPage />
      </Provider>,
    );
  });
});
