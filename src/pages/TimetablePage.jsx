import React from 'react';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { appBoundClassNames as classNames } from '../common/boundClassNames';

import { reset as resetLectureFocus } from '../redux/actions/timetable/lectureFocus';
import { reset as resetList } from '../redux/actions/timetable/list';
import { reset as resetSearch } from '../redux/actions/timetable/search';
import { reset as resetSemester } from '../redux/actions/timetable/semester';
import {
  reset as resetTimetable,
  setSelectedTimetable,
  setIsTimetableTabsOpenOnMobile,
} from '../redux/actions/timetable/timetable';

import CloseButton from '../components/CloseButton';
import Divider from '../components/Divider';
import LectureDetailSection from '../components/sections/timetable/lecturedetail/LectureDetailSection';
import LectureListTabs from '../components/sections/timetable/lecturelist/LectureListTabs';
import LectureListSection from '../components/sections/timetable/lecturelist/LectureListSection';
import TimetableTabs from '../components/sections/timetable/timetableandinfos/TimetableTabs';
import SemesterSection from '../components/sections/timetable/semester/SemesterSection';
import SyncSection from '../components/sections/timetable/sync/SyncSection';
import TimetableSubSection from '../components/sections/timetable/timetableandinfos/TimetableSubSection';
import MapSubSection from '../components/sections/timetable/timetableandinfos/MapSubSection';
import SummarySubSection from '../components/sections/timetable/timetableandinfos/SummarySubSection';
import ExamSubSection from '../components/sections/timetable/timetableandinfos/ExamSubSection';
import ShareSubSection from '../components/sections/timetable/timetableandinfos/ShareSubSection';

import semesterShape from '../shapes/model/subject/SemesterShape';
import { myPseudoTimetableShape } from '../shapes/model/timetable/TimetableShape';
import userShape from '../shapes/model/session/UserShape';
import { parseQueryString } from '@/common/utils/parseQueryString';

const TimetablePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.common.user.user);
  const isPortrait = useSelector((state) => state.common.media.isPortrait);
  const myTimetable = useSelector((state) => state.timetable.timetable.myTimetable);
  const isTimetableTabsOpenOnMobile = useSelector(
    (state) => state.timetable.timetable.isTimetableTabsOpenOnMobile,
  );
  const isLectureListOpenOnMobile = useSelector((state) => state.timetable.list.isLectureListOpenOnMobile);

  React.useEffect(() => {
    const { startInMyTable } = parseQueryString(location.search) || {};
    if (startInMyTable && user) {
      dispatch(setSelectedTimetable(myTimetable));
    }
  }, [location.search, user, myTimetable, dispatch]);

  React.useEffect(() => {
    return () => {
      dispatch(resetLectureFocus());
      dispatch(resetList());
      dispatch(resetSearch());
      dispatch(resetSemester());
      dispatch(resetTimetable());
    };
  }, [dispatch]);

  return (
    <>
      <section className={classNames('content', 'content--no-scroll')}>
        <div
          className={classNames(
            'page-grid',
            'page-grid--timetable',
            isLectureListOpenOnMobile ? 'page-grid--timetable--mobile-expanded' : null,
          )}>
          <LectureDetailSection />
          <LectureListTabs />
          <LectureListSection />
          <div
            className={classNames(
              'section',
              'section--semester-and-timetable-list',
              !isPortrait && 'section--transparent',
              isPortrait && 'section--modal',
              isTimetableTabsOpenOnMobile ? null : 'mobile-hidden',
            )}>
            <CloseButton onClick={() => dispatch(setIsTimetableTabsOpenOnMobile(false))} />
            <TimetableTabs />
            <SemesterSection startSemester={location.state?.startSemester} />
          </div>
          <div className={classNames('section', 'section--timetable-and-infos')}>
            <TimetableSubSection />
            <Divider
              orientation={{ desktop: Divider.Orientation.VERTICAL, mobile: Divider.Orientation.HORIZONTAL }}
              isVisible={true}
              gridArea="divider-main"
            />
            <MapSubSection />
            <Divider orientation={Divider.Orientation.HORIZONTAL} isVisible={{ desktop: true, mobile: false }} gridArea="divider-sub-1" />
            <SummarySubSection />
            <Divider orientation={Divider.Orientation.HORIZONTAL} isVisible={{ desktop: true, mobile: false }} gridArea="divider-sub-2" />
            <ExamSubSection />
            <Divider orientation={Divider.Orientation.HORIZONTAL} isVisible={{ desktop: true, mobile: !isLectureListOpenOnMobile }} gridArea="divider-sub-3" />
            <ShareSubSection />
          </div>
        </div>
      </section>
    </>
  );
};

export default TimetablePage;
