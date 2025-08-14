import styled, { css } from 'styled-components';

export const Content = styled.section<{ noScroll?: boolean }>`
  position: relative;
  margin-left: auto;
  margin-right: auto;

  @media (min-aspect-ratio: calc(4/3)) {
    width: calc(
      1080px + (12px * 2) + (env(safe-area-inset-left) + env(safe-area-inset-right))
    );
  }
  @media (max-aspect-ratio: calc(4/3)) {
    width: 100%;
  }

  ${(p) =>
    p.noScroll &&
    css`
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    `}
`;

export const PageGridMain = styled.div`
  display: grid;
  padding-left: 12px;
  padding-right: 12px;
  overflow: hidden;
  padding-top: 12px;

  @media (min-aspect-ratio: calc(4/3)) {
    min-height: calc(100vh - (260px + 60px + 12px));
    grid-template-columns: 1fr 12px 1fr 12px 1fr;
    grid-template-rows: max-content min-content;
    grid-template-areas:
      'feeds-column-1 .           feeds-column-2  .           feeds-column-3'
      'main-date      main-date   main-date       main-date   main-date';
  }
  @media (max-aspect-ratio: calc(4/3)) {
    grid-template-columns: 1fr;
    grid-template-rows: max-content min-content;
    grid-template-areas: 'feeds-column-1' 'main-date';
  }
`;

export const FeedsColumn = styled.div<{ index: number }>`
  grid-area: ${(p) => `feeds-column-${p.index}`};
  position: relative;
  overflow: initial;
  min-width: 0;
`;

export const FeedPlaceholder = styled.div`
  position: absolute;
  width: 100%;
  & > div {
    opacity: 0.5;
    height: 270px;
    background: rgba(0, 0, 0, 0.03);
    border-radius: 8px;
    margin-bottom: 6px;
  }
`;

export const MainDate = styled.div`
  grid-area: main-date;
  height: 300px;
  padding: calc(300px / 2 - 24px) 0;
  background-image: linear-gradient(rgba(246, 246, 246, 0) 80%, rgba(246, 246, 246, 1));
  color: rgba(229, 76, 101, 0.5);
  text-align: center;
  z-index: 50;
  & > span:first-child,
  & > a:first-child {
    font-size: 18px;
    line-height: 19px;
    cursor: pointer;
  }
  & > div:nth-child(2) {
    margin-top: 10px;
    font-size: 13px;
    line-height: 14px;
  }
`;

export const MainImage = styled.section`
  background: url(/src/static/images/main/background_photo.jpg) center 0;
  background-size: 100% auto;
  @media (min-aspect-ratio: calc(4/3)) {
    height: 260px;
    padding-top: calc(calc(260px / 2) - 9px);
    min-width: calc(1080px + (12px * 2) + (env(safe-area-inset-left) + env(safe-area-inset-right)));
  }
  @media (max-aspect-ratio: calc(4/3)) {
    height: 160px;
    padding-top: calc(calc(160px / 2) - 9px);
    min-width: 100%;
  }
`;

export const PageGridWriteReviews = styled.div`
  display: grid;
  padding-left: 12px;
  padding-right: 12px;
  @media (min-aspect-ratio: calc(4/3)) {
    grid-template-columns: 360px 12px 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: 'write-reviews-left .   write-reviews-right';
  }
  @media (max-aspect-ratio: calc(4/3)) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: 'write-reviews-left';
  }
`;

export const Section = styled.div`
  position: relative;
  padding: 12px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  overflow: hidden;
`;

export const WriteReviewsLeft = styled(Section)`
  grid-area: write-reviews-left;
  display: flex;
  flex-direction: column;
`;

export const WriteReviewsRight = styled(Section)<{ modal?: boolean; transparent?: boolean }>`
  @media (min-aspect-ratio: calc(4/3)) {
    grid-area: write-reviews-right;
  }
  ${(p) =>
    p.modal &&
    css`
      position: absolute;
      width: initial;
      height: initial;
      z-index: 200;
      top: 12px;
      bottom: calc(12px * 2 + env(safe-area-inset-bottom));
      left: calc(12px * 2 + env(safe-area-inset-left));
      right: calc(12px * 2 + env(safe-area-inset-right));
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12), 0 0 0 1000px rgba(0, 0, 0, 0.3);
    `}
  ${(p) =>
    p.transparent &&
    css`
      padding: initial !important;
      background-color: initial;
      border-radius: initial;
      background-origin: initial;
      box-shadow: initial;
    `}
`;

export const PageGridSyllabus = styled.div`
  display: grid;
  padding-left: 12px;
  padding-right: 12px;
  @media (min-aspect-ratio: calc(4/3)) {
    width: calc(900px + 12px * 2);
    grid-template-columns: 1fr;
    grid-template-rows: 48px 1fr;
    grid-template-areas: 'syllabus-tabs' 'syllabus';
  }
  @media (max-aspect-ratio: calc(4/3)) {
    grid-template-columns: 1fr;
    grid-template-rows: 48px 1fr;
    grid-template-areas: 'syllabus-tabs' 'syllabus';
  }
`;

export const TabsSyllabus = styled.div`
  grid-area: syllabus-tabs;
`;

export const SectionSyllabus = styled(Section)`
  grid-area: syllabus;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

export const PageGridDictionary = styled.div`
  display: grid;
  padding-left: 12px;
  padding-right: 12px;
  @media (min-aspect-ratio: calc(4/3)) {
    grid-template-columns: 200px 12px 1fr 12px 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: 'course-list-tabs . course-list . course-detail';
  }
  @media (max-aspect-ratio: calc(4/3)) {
    grid-template-columns: 1fr;
    grid-template-rows: 48px 1fr;
    grid-template-areas: 'course-list-tabs' 'course-list';
  }
`;

export const AreaCourseListTabs = styled.div`
  grid-area: course-list-tabs;
`;
export const AreaCourseList = styled(Section)`
  grid-area: course-list;
`;
export const AreaCourseDetail = styled(Section)`
  grid-area: course-detail;
`;

export const PageGridPlanner = styled.div`
  display: grid;
  padding-left: 12px;
  padding-right: 12px;
  @media (min-aspect-ratio: calc(4/3)) {
    grid-template-columns: 200px 12px 360px 12px 1fr;
    grid-template-rows: 48px 1fr 80px;
    grid-template-areas: 'planner-tabs planner-tabs planner-tabs planner-tabs planner-tabs' 'planner-and-infos planner-and-infos . course-manage course-manage' 'course-list-tabs course-list . course-manage course-manage';
  }
  @media (max-aspect-ratio: calc(4/3)) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: 'planner-and-infos';
  }
`;
export const AreaPlannerTabs = styled.div`
  grid-area: planner-tabs;
`;
export const AreaPlannerAndInfos = styled(Section)`
  grid-area: planner-and-infos;
  display: grid;
`;
export const AreaCourseListTabsPlanner = styled.div`
  grid-area: course-list-tabs;
`;
export const AreaCourseListPlanner = styled(Section)`
  grid-area: course-list;
`;
export const AreaCourseManage = styled(Section)`
  grid-area: course-manage;
`;

export const PageGridTimetable = styled.div<{ mobileExpanded?: boolean }>`
  display: grid;
  padding-left: 12px;
  padding-right: 12px;
  @media (min-aspect-ratio: calc(4/3)) {
    grid-template-columns: 200px 360px 12px 1fr;
    grid-template-rows: 48px 1fr 12px 1fr;
    grid-template-areas:
      'lecture-list-tabs lecture-detail . semester-and-timetable-tabs'
      'lecture-list lecture-detail . timetable-and-infos'
      'lecture-list . . timetable-and-infos'
      'lecture-list . . timetable-and-infos';
  }
  @media (max-aspect-ratio: calc(4/3)) {
    padding-bottom: 0px !important;
    grid-template-columns: 1fr;
    grid-template-rows: ${(p) => (p.mobileExpanded ? '1fr 12px 48px 1fr 12px' : '1fr 12px 0 0 0')};
    grid-template-areas:
      'timetable-and-infos'
      '.'
      'lecture-list-tabs'
      'lecture-list'
      '.';
    transition: grid-template-rows 0.2s ease-out;
  }
`;
export const AreaLectureListTabs = styled.div`
  grid-area: lecture-list-tabs;
`;
export const AreaLectureList = styled(Section)`
  grid-area: lecture-list;
`;
export const AreaLectureDetail = styled(Section)`
  grid-area: lecture-detail;
`;
export const AreaSemesterAndTimetableTabs = styled(Section)`
  grid-area: semester-and-timetable-tabs;
`;
export const AreaTimetableAndInfos = styled(Section)`
  grid-area: timetable-and-infos;
`;