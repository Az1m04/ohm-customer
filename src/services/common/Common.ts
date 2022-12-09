import { callApi } from '@/utils/apiUtils';
import CommonEndpoints from '@/utils/endpoints/common';

import { CreateTokenResponse } from './Common.types';

class CommonServices {
  public getTopDevelopers = async () => {
    const res = callApi<CreateTokenResponse>({
      uriEndPoint: {
        ...CommonEndpoints.getTopDevelopers,
      },
    }).catch((error) => {
      throw error;
    });

    return res;
  };

  public getUserDetails = async (payload: any) => {
    const res = callApi<any>({
      uriEndPoint: {
        ...CommonEndpoints.getUserDetails,
      },
      ...payload,
    }).catch((error) => {
      throw error;
    });

    return res;
  };
}
export default CommonServices;
