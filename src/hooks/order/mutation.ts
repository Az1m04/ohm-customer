import { useMutation } from 'react-query';

import { addToOrders } from '@/services/order/orderServices';

export const useAddToOrder = () => {
  return useMutation((payload: any) => addToOrders(payload));
};
