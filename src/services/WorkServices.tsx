import { callApi } from '@/utils/apiUtils';
import workEndpoints from '@/utils/work';

import { TimeEntriesOutput } from '../hooks/work/useTimeEntries.types';

export interface TimeEntriesInput {
  clientId: string;
  startDate: string;
  endDate: string;
}

class WorkServices {
  public getTimeEntries = async ({
    clientId,
    startDate,
    endDate,
  }: TimeEntriesInput) => {
    return callApi<TimeEntriesOutput>({
      uriEndPoint: {
        ...workEndpoints.getTimeEntries,
      },
      query: {
        clientId,
        startDate,
        endDate,
      },
    });
  };
}
export default WorkServices;
