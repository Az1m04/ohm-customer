import { callApi } from '@/utils/apiUtils';
import passwordEndpoints from '@/utils/endpoints/password';

import { CreateTokenResponse, VerifyResponse } from './PasswordServices.types';
import { cookies } from '../../utils/apiUtils';

class PasswordServices {
  public forgotPasswordService = async ({ body }: any) => {
    return callApi<CreateTokenResponse>({
      uriEndPoint: {
        ...passwordEndpoints.forgotPassword,
      },
      body,
    })
      .then((createTokenResponse) => {
        cookies.set('accessToken', createTokenResponse.accessToken, {
          path: '/forgetPassword',
        });
        cookies.set('refreshToken', createTokenResponse.refreshToken, {
          path: '/forgetPassword',
        });
        localStorage.setItem('user', JSON.stringify(createTokenResponse?.user));
        return createTokenResponse;
      })
      .catch((error) => {
        throw error?.response?.data?.error;
      });
  };

  public verifyOtpService = async ({ pathParams }) => {
    return callApi<VerifyResponse>({
      uriEndPoint: { ...passwordEndpoints.verifyOtp },
      pathParams,
    })
      .then((VerifyResponse) => {
        return VerifyResponse;
      })
      .catch((error) => {
        throw error?.response?.data?.error;
      });
  };

  public resetPasswordService = async ({ pathParams }) => {
    return callApi<VerifyResponse>({
      uriEndPoint: {
        ...passwordEndpoints.resetPassword,
      },
      pathParams,
    })
      .then((VerifyResponse) => {
        return VerifyResponse;
      })
      .catch((error) => {
        throw error?.response?.data?.error;
      });
  };
}

export default PasswordServices;
