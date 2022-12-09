// import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

import { getDefaultHeaders } from '@/utils/apiUtils';
import routesRequireAuth from '@/utils/routesRequireAuth.json';

interface SecurityLayoutType {
  children: ReactNode;
}

const SercurityLayout = ({ children }: SecurityLayoutType) => {
  const router = useRouter();
  const { accessToken }: any = getDefaultHeaders();
  const authRequired = routesRequireAuth.includes(router.pathname);
  useEffect(() => {
    if (!accessToken && authRequired) {
      router.push('/auth/login');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

export default SercurityLayout;
