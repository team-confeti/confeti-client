import { useSuspenseQuery } from '@tanstack/react-query';

import { MY_HISTORY_TIME_TABLE_PREVIEW_QUERY_OPTION } from '@shared/apis/my-history/my-history-queries';

export const useMyTimeTablePreview = () => {
  const { data } = useSuspenseQuery(
    MY_HISTORY_TIME_TABLE_PREVIEW_QUERY_OPTION.MY_TIME_TABLE_PREVIEW(),
  );
  return { data };
};
