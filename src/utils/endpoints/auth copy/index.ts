import { EndPoint } from '../../../types/endpoints';

const authEndpoints: EndPoint = {
  accessLogin: {
    uri: '/access/token',
    method: 'POST',
    version: '/xapi/v1',
  },
};

export default authEndpoints;
