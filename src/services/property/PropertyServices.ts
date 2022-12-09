import { callApi } from '@/utils/apiUtils';
import propertyEndpoints from '@/utils/endpoints/property';

import {
  CreateTokenResponse,
  PostPropertyType,
  RequestCallback,
} from './PropertyServices.types';

class PropertyServices {
  public getPropertyTypes = async () => {
    const res = callApi<CreateTokenResponse>({
      uriEndPoint: {
        ...propertyEndpoints.getPropertyTypes,
      },
    }).catch((error) => {
      throw error;
    });

    return res;
  };
  public getProperty = async () => {
    const res = callApi<PostPropertyType[]>({
      uriEndPoint: {
        ...propertyEndpoints.getProperty,
      },
    }).catch((error) => {
      throw error;
    });
    return res;
  };
  public postProperty = async (payload: PostPropertyType) => {
    const res = callApi<PostPropertyType>({
      uriEndPoint: {
        ...propertyEndpoints.postProperty,
      },
      body: { ...payload },
    }).catch((error) => {
      throw error;
    });
    return res;
  };
  public requestCallback = async (payload: RequestCallback) => {
    const res = callApi<RequestCallback>({
      uriEndPoint: {
        ...propertyEndpoints.requestCallback,
      },
      body: payload,
    }).catch((error) => {
      throw error;
    });
    return res;
  };
}
export default PropertyServices;
