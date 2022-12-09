import { EndPoint } from '@/types/endpoints';

const workEndpoints: EndPoint = {
  getTimeEntries: {
    uri: '/time-entries',
    method: 'GET',
    version: '/xapi/v1',
  },
};

export default workEndpoints;
