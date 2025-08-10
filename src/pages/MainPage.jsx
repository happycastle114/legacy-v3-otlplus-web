import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes, { bool } from 'prop-types';
import axios from 'axios';
import { range } from 'lodash';
import { Link } from 'react-router-dom';
import { ZaboEmbed } from 'zabo-embed';

import Footer from '../common/guideline/components/Footer';
import TodaysTimetableSection from '../components/sections/main/TodaysTimetableSection';
import AcademicScheduleSection from '../components/sections/main/AcademicScheduleSection';
import RelatedCourseFeedSection from '../components/sections/main/RelatedCourseFeedSection';
import LatestReviewSection from '../components/sections/main/LatestReviewSection';
import FamousMajorReviewFeedSection from '../components/sections/main/FamousMajorReviewFeedSection';
import FamousHumanityReviewFeedSection from '../components/sections/main/FamousHumanityReviewFeedSection';
import RankedReviewFeedSection from '../components/sections/main/RankedReviewFeedSection';
import ReviewWriteFeedSection from '../components/sections/main/ReviewWriteFeedSection';
import MainSearchSection from '../components/sections/main/MainSearchSection';
import userShape from '../shapes/model/session/UserShape';
import NoticeSection from '../components/sections/main/NoticeSection';
import RateFeedSection from '../components/sections/main/RateFeedSection';
import {
  Content,
  PageGridMain,
  FeedsColumn,
  FeedPlaceholder,
  MainDate,
  MainImage,
} from '@/common/styled/Layout';

const MainPage = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.common.user.user);
  const isPortrait = useSelector((state) => state.common.media.isPortrait);

  const [feedDays, setFeedDays] = React.useState([]);
  const [notices, setNotices] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const contentRef = React.useRef(null);
  const reviewWriteIdRefs = React.useRef([]);

  const getDateDifference = React.useCallback((date) => {
    const copiedDate = new Date(date);
    const todayDate = new Date();
    copiedDate.setHours(0, 0, 0, 0);
    todayDate.setHours(0, 0, 0, 0);
    const timeDiff = todayDate - copiedDate;
    return timeDiff / (24 * 60 * 60 * 1000);
  }, []);

  const getPrevDate = React.useCallback(() => {
    const targetDate = new Date(feedDays[feedDays.length - 1].date);
    targetDate.setDate(targetDate.getDate() - 1);
    return targetDate;
  }, [feedDays]);

  const checkAndLoadFeeds = React.useCallback(() => {
    const SCROLL_BOTTOM_PADDING = 100;
    if (isLoading) return;
    if (!user) return;
    if (!contentRef.current) return;

    const columns = Array.from(contentRef.current.querySelectorAll(`[data-feeds-column]`));

    const isBottomReached = columns.some(
      (cl) => cl.lastChild.getBoundingClientRect().top < window.innerHeight + SCROLL_BOTTOM_PADDING,
    );
    if (isBottomReached) {
      fetchFeeds(getPrevDate());
    }
  }, [isLoading, user, getPrevDate]);

  const fetchFeeds = React.useCallback(
    (date) => {
      if (isLoading) return;
      if (!user) return;
      if (getDateDifference(date) >= 14) return;

      setIsLoading(true);

      const dateString = date.toJSON().slice(0, 10);

      axios
        .get(`/api/users/${user.id}/feeds`, {
          params: { date: dateString },
          metadata: { gaCategory: 'Feed', gaVariable: 'GET / List' },
        })
        .then((response) => {
          const filteredFeeds = [];
          for (const feed of response.data) {
            if (feed.type == 'REVIEW_WRITE') {
              if (!reviewWriteIdRefs.current.includes(feed.lecture?.id)) {
                filteredFeeds.push(feed);
                if (feed.lecture?.id) reviewWriteIdRefs.current.push(feed.lecture?.id);
              }
            } else {
              filteredFeeds.push(feed);
            }
          }

          setIsLoading(false);
          setFeedDays((prev) => [
            ...prev,
            {
              date: dateString,
              feeds: filteredFeeds,
            },
          ]);
          checkAndLoadFeeds();
        })
        .catch(() => {
          setIsLoading(false);
        });
    },
    [isLoading, user, getDateDifference, checkAndLoadFeeds],
  );

  const fetchNotices = React.useCallback(() => {
    const now = new Date();
    axios
      .get('/api/notices', {
        params: { time: now.toJSON(), order: ['start_time', 'id'] },
        metadata: { gaCategory: 'Notice', gaVariable: 'GET / List' },
      })
      .then((response) => setNotices(response.data))
      .catch(() => {});
  }, []);

  React.useEffect(() => {
    const handleScroll = () => checkAndLoadFeeds();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [checkAndLoadFeeds]);

  React.useEffect(() => {
    const today = new Date();
    if (user) {
      fetchFeeds(today);
    }
    fetchNotices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  React.useEffect(() => {
    if (user) return;
  }, [user]);

  const mapFeedToSection = (feed, date) => {
    if (feed.type === 'REVIEW_WRITE') {
      return (
        <ReviewWriteFeedSection
          lecture={feed.lecture}
          review={user.reviews.find((r) => r.lecture.id === feed.lecture.id)}
          key={`${date.date}-${feed.type}-${feed.lecture.id}`}
        />
      );
    }
    if (feed.type === 'RELATED_COURSE') {
      return (
        <RelatedCourseFeedSection
          course={feed.course}
          key={`${date.date}-${feed.type}-${feed.course.id}`}
        />
      );
    }
    if (feed.type === 'FAMOUS_MAJOR_REVIEW') {
      return (
        <FamousMajorReviewFeedSection
          department={feed.department}
          reviews={feed.reviews}
          key={`${date.date}-${feed.type}-${feed.department.code}`}
        />
      );
    }
    if (feed.type === 'FAMOUS_HUMANITY_REVIEW') {
      return (
        <FamousHumanityReviewFeedSection
          reviews={feed.reviews}
          key={`${date.date}-${feed.type}`}
        />
      );
    }
    if (feed.type === 'RANKED_REVIEW') {
      return (
        <RankedReviewFeedSection
          semester={feed.semester}
          reviews={feed.reviews}
          key={`${date.date}-${feed.type}`}
        />
      );
    }
    if (feed.type === 'RATE') {
      return <RateFeedSection rated={feed.rated} key={`${date.date}-${feed.type}`} />;
    }
    return null;
  };

  const columnNum = isPortrait ? 1 : 3;

  const feeds = [
    <TodaysTimetableSection key="TODAYS_TIMETABLE" />,
    <AcademicScheduleSection key="ACADEMIC_SCHEDULE" />,
    <ZaboEmbed key="ZABO_EMBED" serviceColor="#E54C65" style={{ marginBottom: 12 }} />,
    notices
      ? notices.map((n) => <NoticeSection notice={n} key={`${n.start_date}-${n.end_date}-${n.title}`} />)
      : [],
    <LatestReviewSection key="LATEST_REVIEW" />,
    !user ? [] : feedDays.map((d) => d.feeds.map((f) => mapFeedToSection(f, d))),
  ].flat(3);

  return (
    <>
      <MainImage>
        <MainSearchSection />
      </MainImage>
      <Content ref={contentRef}>
        <PageGridMain>
          {range(columnNum).map((i) => (
            <FeedsColumn index={i + 1} data-feeds-column key={i}>
              {feeds.filter((v, i2) => i2 % columnNum === i)}
              <FeedPlaceholder>
                {range(10).map((j) => (
                  <div key={j} />
                ))}
              </FeedPlaceholder>
            </FeedsColumn>
          ))}
          <MainDate>
            {user ? (
              <span onClick={() => fetchFeeds(getPrevDate())}>{t('ui.button.loadMore')}</span>
            ) : process.env.VITE_DEV_MODE === 'true' ? (
              <Link to="/developer-login">{t('ui.button.signInWithSso')}</Link>
            ) : (
              <>
                <a href={`/session/login/?next=${window.location.href}`}>{t('ui.button.signInWithSso')}</a>
                <div>{t('ui.message.signInForMore')}</div>
              </>
            )}
          </MainDate>
        </PageGridMain>
      </Content>
      <Footer />
    </>
  );
};

export default MainPage;
