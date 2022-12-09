//import UserProfile from '@/components/UserProfile';

import { useEffect, useState } from 'react';

import Modal from '@/components/modal';

import Container from '../Container';
import Footer from '../Footer';
import Header from '../Header';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const verify: any =
    typeof window !== 'undefined' ? localStorage.getItem('verify') : null;

  const [ageVerification, setAgeVerification] = useState<any>(false);

  useEffect(() => {
    if (verify === 'yes') {
      setAgeVerification(true);
    }
  }, []);

  return (
    <div>
      {!verify && !ageVerification ? (
        <div className='absolute top-[0] z-[999] w-full '>
          <div
            className='flex  h-[100vh] items-center justify-center'
            style={{ background: '#333333' }}
          >
            <Modal setAgeVerification={setAgeVerification} />
          </div>
        </div>
      ) : (
        <Container>
          <main className=''>
            <Header />

            <div className=''> {children}</div>
            <Footer />
          </main>
        </Container>
      )}
    </div>
  );
}
