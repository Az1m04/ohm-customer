/* eslint-disable react-hooks/rules-of-hooks */

import { VerifyParams } from '@/hooks/auth/verify/useVerify.types';

import { callApi } from '@/utils/apiUtils';
import userEndpoints from '@/utils/endpoints/auth';

import { CreateTokenResponse, VerifyResponse } from './AuthServices.types';
import { cookies } from '../../utils/apiUtils';

class AuthServices {
  public login = async ({ body }: any) => {
    return callApi<CreateTokenResponse>({
      uriEndPoint: {
        ...userEndpoints.accessLogin,
      },
      body,
    })
      .then((createTokenResponse) => {
        cookies.set('accessToken', createTokenResponse.accessToken, {
          path: '/',
        });
        cookies.set('refreshToken', createTokenResponse.refreshToken, {
          path: '/',
        });
        localStorage.setItem('user', JSON.stringify(createTokenResponse?.user));
        return createTokenResponse;
      })
      .catch((error) => {
        throw error?.response;
      });
  };

  public verify = async (payload: VerifyParams) => {
    return callApi<VerifyResponse>({
      uriEndPoint: {
        ...userEndpoints.verify,
        headerProps: {
          otptoken: btoa(`${payload.otp}:test:${payload.email}`),
        },
      },
    })
      .then((VerifyResponse) => {
        cookies.set('accessToken', VerifyResponse.accessToken, {
          path: '/',
        });
        cookies.set('refreshToken', VerifyResponse.refreshToken, {
          path: '/',
        });
        return VerifyResponse;
      })
      .catch((error) => {
        throw error?.response?.data?.error;
      });
  };

  public register = async ({ body }: any) => {
    return callApi<CreateTokenResponse>({
      uriEndPoint: {
        ...userEndpoints.register,
        headerProps: {
          'content-type': 'multipart/form-data',
        },
      },
      body,
    })
      .then((tokenResponse) => {
        cookies.set('otptoken', tokenResponse.accessToken, {
          path: '/',
        });
        return tokenResponse;
      })
      .catch((error) => {
        throw error?.response?.data?.error;
      });
  };

  public logout = async () => {
    return callApi<CreateTokenResponse>({
      uriEndPoint: {
        ...userEndpoints.accessLogout,
        headerProps: {
          Cookie: '',
          Authorization: '',
        },
      },
    })
      .then(() => {
        cookies.remove('accessToken');
      })
      .catch((error) => {
        throw error?.response?.data?.error;
      });
  };
}

export default AuthServices;
