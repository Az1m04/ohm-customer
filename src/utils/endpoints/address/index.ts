import { EndPoint } from '@/types/endpoints';

const addressEndpoints: EndPoint = {
  getAddress: {
    uri: '/shippigAddress/',
    method: 'GET',
    version: '/api',
  },
  addAddress: {
    uri: '/shippigAddress/create',
    method: 'POST',
    version: '/api',
  },
  updateAddress: {
    uri: '/shippigAddress/update/:id',
    method: 'PUT',
    version: '/api',
  },
  getSingleAddress: {
    uri: '/shippigAddress/:id',
    method: 'GET',
    version: '/api',
  },
  deleteAddress: {
    uri: '/shippigAddress/delete/:id',
    method: 'DELETE',
    version: '/api',
  },
};

export default addressEndpoints;
