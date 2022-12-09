import { EndPoint } from '../../../types/endpoints';

const CommonEndpoints: EndPoint = {
  getTopDevelopers: {
    uri: '/user/getTopDevelopers',
    method: 'GET',
    version: '/api',
  },
  getUserDetails: {
    uri: '/orders/:id',
    method: 'GET',
    version: '/api'
  }
};

export default CommonEndpoints;
