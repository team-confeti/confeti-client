import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { FESTIVAL_TIMETABLE_QUERY_OPTIONS } from '@shared/apis/timetable/festival-timetable-queries';
import { FestivalTimetable } from '@shared/types/festival-timetable-response';

import TimetableContent from '../timetable-content/timetable-content';

const TimetableDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const timetableId = Number(id);

  const { data } = useSuspenseQuery(
    FESTIVAL_TIMETABLE_QUERY_OPTIONS.TIMETABLE_DATES(timetableId),
  );

  const festival: FestivalTimetable = {
    festivalId: data.timetableId,
    title: data.title,
    logoUrl: data.posterUrl,
    festivalDates: data.dates.map((d) => ({
      festivalDateId: d.festivalDateId,
      festivalAt: d.festivalAt,
    })),
  };

  return <TimetableContent festivals={[festival]} />;
};

export default TimetableDetailPage;
