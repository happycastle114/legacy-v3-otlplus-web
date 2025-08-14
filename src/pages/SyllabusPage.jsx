import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import Scroller from '../components/Scroller';

import { getSyllabusUrl } from '../utils/lectureUtils';
import { useLocation } from 'react-router';
import { parseQueryString } from '@/common/utils/parseQueryString';
import { Content, PageGridSyllabus, TabsSyllabus, SectionSyllabus } from '@/common/styled/Layout';

const SyllabusPage = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.common.user.user);
  const location = useLocation();

  const [lectures, setLectures] = React.useState(undefined);
  const [selectedLecture, setSelectedLecture] = React.useState(undefined);

  const setTimetableLectures = React.useCallback(() => {
    const { timetable, year, semester } = parseQueryString(location.state);

    if (timetable === -1) {
      const l = user.my_timetable_lectures.filter((l) => l.year === year && l.semester === semester);
      setLectures(l);
      setSelectedLecture(l[0]);
    } else {
      axios
        .get(`/api/users/${user.id}/timetables/${timetable}`, {
          params: {},
          metadata: { gaCategory: 'Timetable', gaVariable: 'GET / Instance' },
        })
        .then((response) => {
          const l = response.data.lectures;
          setLectures(l);
          setSelectedLecture(l[0]);
        })
        .catch(() => {});
    }
  }, [location.state, user]);

  React.useEffect(() => {
    if (user) setTimetableLectures();
  }, [user, setTimetableLectures]);

  const tabs = lectures ? (
    lectures.map((l) => (
      <div key={l.id} onClick={() => setSelectedLecture(l)}>
        {l[t('js.property.title')]}
      </div>
    ))
  ) : (
    <div style={{ pointerEvents: 'none' }}>{t('ui.placeholder.loading')}</div>
  );

  const contents = lectures
    ? lectures.map((l) => (
        <iframe
          src={getSyllabusUrl(l)}
          title={`syllabus-${l.title}`}
          key={l.id}
          style={l.id === selectedLecture?.id ? {} : { display: 'none' }}>
          {l[t('js.property.title')]}
        </iframe>
      ))
    : null;

  return (
    <Content noScroll>
      <PageGridSyllabus>
        <TabsSyllabus>
          <Scroller noScrollX={false} noScrollY={true} expandBottom={2}>
            {tabs}
          </Scroller>
        </TabsSyllabus>
        <SectionSyllabus>
          <div>{contents}</div>
        </SectionSyllabus>
      </PageGridSyllabus>
    </Content>
  );
};

export default SyllabusPage;
