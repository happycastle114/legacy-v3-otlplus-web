import React from 'react';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { appBoundClassNames as classNames } from '../common/boundClassNames';

import { reset as resetCourseFocus } from '../redux/actions/planner/itemFocus';
import { reset as resetList } from '../redux/actions/planner/list';
import { reset as resetSearch } from '../redux/actions/planner/search';
import { reset as resetPlanner } from '../redux/actions/planner/planner';

import plannerShape from '../shapes/model/planner/PlannerShape';

import Divider from '../components/Divider';
import PlannerTabs from '../components/sections/planner/plannerandinfos/PlannerTabs';
import PlannerSubSection from '../components/sections/planner/plannerandinfos/PlannerSubSection';
import CourseListTabs from '../components/sections/planner/courselist/CourseListTabs';
import CourseListSection from '../components/sections/planner/courselist/CourseListSection';
import CourseManageSection from '../components/sections/planner/coursemanage/CourseManageSection';
import TrackSubSection from '../components/sections/planner/plannerandinfos/TrackSubSection';
import SummarySubSection from '../components/sections/planner/plannerandinfos/SummarySubSection';
import TrackSettingsSection from '../components/sections/planner/TrackSettingsSection';
import BetaPopup from '../components/BetaPopup';

const PlannerPage = () => {
  const dispatch = useDispatch();
  const isTrackSettingsSectionOpen = useSelector(
    (state) => state.planner.planner.isTrackSettingsSectionOpen,
  );
  const selectedPlanner = useSelector((state) => state.planner.planner.selectedPlanner);

  React.useEffect(() => {
    return () => {
      dispatch(resetCourseFocus());
      dispatch(resetList());
      dispatch(resetSearch());
      dispatch(resetPlanner());
    };
  }, [dispatch]);

  return (
    <>
      <section className={classNames('content', 'content--no-scroll')}>
        <div className={classNames('page-grid', 'page-grid--planner')}>
          <PlannerTabs />
          <CourseListTabs />
          <div className={classNames('section', 'section--planner-and-infos')}>
            <PlannerSubSection />
            <Divider
              orientation={{ desktop: Divider.Orientation.VERTICAL, mobile: Divider.Orientation.HORIZONTAL }}
              isVisible={{ desktop: true, mobile: false }}
              gridArea="divider-main"
            />
            <TrackSubSection />
            <Divider orientation={Divider.Orientation.HORIZONTAL} isVisible={{ desktop: true, mobile: false }} gridArea="divider-sub-1" />
            <SummarySubSection />
          </div>
          <CourseListSection />
          <CourseManageSection />
          {isTrackSettingsSectionOpen && selectedPlanner && <TrackSettingsSection />}
        </div>
        <BetaPopup
          title="졸업플래너 베타 서비스 안내"
          content={[
            '졸업플레너 서비스는 현재 베타 상태입니다.',
            '일부 학점 계산이 정확하지 않거나 기능 사용이 불편할 수 있으며, 이는 정식 출시 때 개선될 예정입니다.',
          ]}
          link="https://sparcs.page.link/otl-feedback"
        />
      </section>
    </>
  );
};

export default PlannerPage;
