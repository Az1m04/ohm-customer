import { useQuery } from 'react-query';

import { TimeEntriesOutput } from './useTimeEntries.types';
import { TimeEntriesInput } from '../../services/WorkServices';
import WorkServices from '../../services/WorkServices';

const { getTimeEntries } = new WorkServices();

export const useTimeEntries = ({
  clientId,
  endDate,
  startDate,
}: TimeEntriesInput) =>
  useQuery<unknown, unknown, TimeEntriesOutput>(
    ['timeEntries', clientId],
    () => {
      return getTimeEntries({ clientId, startDate, endDate });
    },
    {
      enabled: !!clientId,
    }
  );
