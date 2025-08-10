import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@/test-utils';
import TimetablePage from '@/pages/TimetablePage';

const rootReducer = (state: any) => state;
const createStore = (preloadedState: any) =>
  configureStore({ reducer: rootReducer as any, preloadedState });

describe('TimetablePage', () => {
  it('renders', () => {
    const preloaded = {
      timetable: { timetable: { isTimetableTabsOpenOnMobile: true, myTimetable: {} } },
      common: { user: { user: { id: 1 } }, media: { isPortrait: false } },
      timetable: {
        list: { isLectureListOpenOnMobile: false },
        timetable: { isTimetableTabsOpenOnMobile: true, myTimetable: {} },
      },
    } as any;
    const store = createStore(preloaded);

    render(
      <Provider store={store}>
        <TimetablePage />
      </Provider>,
    );
  });
});
