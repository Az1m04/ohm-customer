import { EndPoint } from '@/types/endpoints';

const wishlistEndpoints: EndPoint = {
  add: {
    uri: '/wishlist/:productId',
    method: 'POST',
    version: '/api',
  },
  getWishlist: {
    uri: '/wishlist',
    method: 'GET',
    version: '/api',
  },
  delete: {
    uri: '/wishlist/delete/:productId',
    method: 'DELETE',
    version: '/api',
  },
};

export default wishlistEndpoints;
