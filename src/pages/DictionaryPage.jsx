import React from 'react';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { appBoundClassNames as classNames } from '../common/boundClassNames';
import { CourseListCode } from '@/shapes/enum';

import CourseListSection from '../components/sections/dictionary/courselist/CourseListSection';
import CourseDetailSection from '../components/sections/dictionary/coursedetail/CourseDetailSection';
import CourseListTabs from '../components/sections/dictionary/courselist/CourseListTabs';

import { reset as resetCourseFocus, setCourseFocus } from '../redux/actions/dictionary/courseFocus';
import {
  clearSearchListCourses,
  reset as resetList,
  setListCourses,
  setSelectedListCode,
} from '../redux/actions/dictionary/list';
import { closeSearch, reset as resetSearch } from '../redux/actions/dictionary/search';
import { performSearchCourses } from '../common/commonOperations';
import { parseQueryString } from '@/common/utils/parseQueryString';

const DictionaryPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();

  React.useEffect(() => {
    const { startCourseId, startTab, startSearchKeyword } = parseQueryString(location.search) || {};

    if (startCourseId) {
      axios
        .get(`/api/courses/${startCourseId}`, {
          metadata: { gaCategory: 'Course', gaVariable: 'GET / Instance' },
        })
        .then((response) => {
          dispatch(setCourseFocus(response.data));
        })
        .catch(() => {});
    }

    if (startTab) {
      dispatch(setSelectedListCode(startTab));
    }

    if (startSearchKeyword && startSearchKeyword.toString().trim()) {
      const LIMIT = 10;
      const option = { keyword: startSearchKeyword.toString().trim() };
      const beforeRequest = () => {
        dispatch(closeSearch());
        dispatch(clearSearchListCourses());
      };
      const afterResponse = (courses) => {
        dispatch(setListCourses(CourseListCode.SEARCH, courses));
      };
      performSearchCourses(option, LIMIT, beforeRequest, afterResponse);
    } else if (startSearchKeyword !== undefined && startSearchKeyword.toString().trim().length === 0) {
      alert(t('ui.message.blankSearchKeyword'));
      return;
    }

    return () => {
      dispatch(resetCourseFocus());
      dispatch(resetList());
      dispatch(resetSearch());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return (
    <>
      <section className={classNames('content', 'content--no-scroll')}>
        <div className={classNames('page-grid', 'page-grid--dictionary')}>
          <CourseListTabs />
          <CourseListSection />
          <CourseDetailSection />
        </div>
      </section>
    </>
  );
};

export default DictionaryPage;
