import { AppProps } from 'next/app';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import DashboardLayout from '@/components/layout/Dashboard/DashboardLayout';

import routesWithoutLayout from '@/utils/routesWithoutLayout.json';

import SecurityLayout from '../components/layout/SecurityLayout';
export const queryClient = new QueryClient();
function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  const isLayoutNeeded = !routesWithoutLayout.includes(
    appProps?.router?.pathname
  );
  const DefultLayout = isLayoutNeeded ? DashboardLayout : React.Fragment;

  return (
    <QueryClientProvider client={queryClient}>
      <SecurityLayout>
        <DefultLayout>
          <Component {...pageProps} />
        </DefultLayout>
      </SecurityLayout>
    </QueryClientProvider>
  );
}

export default MyApp;
