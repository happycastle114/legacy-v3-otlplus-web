import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Divider from '../components/Divider';
import MySummarySubSection from '../components/sections/write-reviews/reviewsleft/MySummarySubSection';
import TakenLecturesSubSection from '../components/sections/write-reviews/reviewsleft/TakenLecturesSubSection';
import ReviewsMenusSubSection from '../components/sections/write-reviews/reviewsleft/ReviewsMenusSubSection';
import LectureReviewsSubSection from '../components/sections/write-reviews/reviewsright/LectureReviewsSubSection';
import LatestReviewsSubSection from '../components/sections/write-reviews/reviewsright/LatestReviewsSubSection';
import MyReviewsSubSection from '../components/sections/write-reviews/reviewsright/MyReviewsSubSection';
import LikedReviewsSubSection from '../components/sections/write-reviews/reviewsright/LikedReviewsSubSection';
import RankedReviewsSubSection from '../components/sections/write-reviews/reviewsright/RankedReviewsSubSection';

import {
  reset as resetReviewsFocus,
  setReviewsFocus,
} from '../redux/actions/write-reviews/reviewsFocus';
import { reset as resetLatestReviews } from '../redux/actions/write-reviews/latestReviews';
import { reset as resetLikedReviews } from '../redux/actions/write-reviews/likedReviews';
import { reset as resetRankedReviews } from '../redux/actions/write-reviews/rankedReviews';
import { ReviewsFocusFrom } from '@/shapes/enum';

import reviewsFocusShape from '../shapes/state/write-reviews/ReviewsFocusShape';
import OtlplusPlaceholder from '../components/OtlplusPlaceholder';
import { useLocation } from 'react-router';
import { parseQueryString } from '@/common/utils/parseQueryString';
import { Content, PageGridWriteReviews, WriteReviewsLeft, WriteReviewsRight } from '@/common/styled/Layout';

const WriteReviewsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isPortrait = useSelector((state) => state.common.media.isPortrait);
  const reviewsFocus = useSelector((state) => state.writeReviews.reviewsFocus);

  const location = useLocation();

  React.useEffect(() => {
    const { startList } = parseQueryString(location.state) || {};
    if (startList) {
      dispatch(setReviewsFocus(startList, null));
    }
    return () => {
      dispatch(resetReviewsFocus());
      dispatch(resetLatestReviews());
      dispatch(resetLikedReviews());
      dispatch(resetRankedReviews());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getReviewsSubSection = (focusFrom) => {
    if (focusFrom === ReviewsFocusFrom.NONE) {
      return <OtlplusPlaceholder />;
    }
    if (focusFrom === ReviewsFocusFrom.LECTURE) {
      return <LectureReviewsSubSection />;
    }
    if (focusFrom === ReviewsFocusFrom.REVIEWS_LATEST) {
      return <LatestReviewsSubSection />;
    }
    if (focusFrom === ReviewsFocusFrom.REVIEWS_MY) {
      return <MyReviewsSubSection />;
    }
    if (focusFrom === ReviewsFocusFrom.REVIEWS_LIKED) {
      return <LikedReviewsSubSection />;
    }
    if (focusFrom === ReviewsFocusFrom.REVIEWS_RANKED) {
      return <RankedReviewsSubSection />;
    }
    return null;
  };

  return (
    <>
      <Content noScroll>
        <PageGridWriteReviews>
          <WriteReviewsLeft>
            <MySummarySubSection />
            <Divider orientation={Divider.Orientation.HORIZONTAL} isVisible={true} />
            <TakenLecturesSubSection />
            <Divider orientation={Divider.Orientation.HORIZONTAL} isVisible={true} />
            <ReviewsMenusSubSection />
          </WriteReviewsLeft>
          <WriteReviewsRight modal={!!isPortrait} transparent={false}>
            {getReviewsSubSection(reviewsFocus.from)}
          </WriteReviewsRight>
        </PageGridWriteReviews>
      </Content>
    </>
  );
};

export default WriteReviewsPage;
