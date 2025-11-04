import { Spacing } from '@confeti/design-system';

import { DetailHeader, Footer } from '@shared/components';
import { TimetableList } from '@shared/components/timetable-list/timetable-list';

import { TimetableListHeader } from '@pages/my/components/timetable/timetable-list-header';

import * as styles from './my-timetable.css';

// TODO: API 연동 후 실제 데이터로 교체
const MOCK_TIMETABLES = [
  {
    id: 1,
    posterUrl: 'https://picsum.photos/200/200?random=1',
    title: '2024 서울 재즈 페스티벌',
    dDay: 'D-5',
  },
  {
    id: 2,
    posterUrl: 'https://picsum.photos/200/200?random=2',
    title: 'IU 콘서트 H.E.R',
    dDay: 'D-12',
  },
  {
    id: 3,
    posterUrl: 'https://picsum.photos/200/200?random=3',
    title: '락페스티벌 2024',
    dDay: 'D-20',
  },
  {
    id: 4,
    posterUrl: 'https://picsum.photos/200/200?random=4',
    title: '뉴진스 Bunnies Camp 2024',
    dDay: 'D-30',
  },
  {
    id: 5,
    posterUrl: 'https://picsum.photos/200/200?random=5',
    title: '에픽하이 20주년 콘서트',
    dDay: 'D-45',
  },
];

const MyTimetable = () => {
  return (
    <>
      <DetailHeader title="타임테이블 목록" />
      <TimetableListHeader />
      <TimetableList timetables={MOCK_TIMETABLES} />
      <Spacing color="white" className={styles.spacing} />
      <Footer />
    </>
  );
};

export default MyTimetable;
