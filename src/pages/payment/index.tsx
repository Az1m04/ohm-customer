import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import logo from 'src/assets/img/logo1.png';

import CartInformation from '@/components/payment/leftside/CartInformation';
import InvoiceInformation from '@/components/payment/leftside/InvoiceInformation';
import ShippingInformation from '@/components/payment/leftside/ShippingInformation';
import RightSide from '@/components/payment/right';

function Payment() {
  const [step, setStep] = useState(0 as any);
  const [data, setData] = useState([] as any);

  const [differentStyleNow, setDifferentStyleNow] = useState('');

  const differentStyle = () => {
    if (step !== 2) {
      return setDifferentStyleNow('px-28');
    }
    if (step === 2) {
      return setDifferentStyleNow('px-[500px]');
    }
  };

  useEffect(() => {
    differentStyle();
  }, []);

  return (
    <div className='flex w-full  flex-wrap'>
      <div className='flex-1 border-gray-400 py-10 px-10   sm:w-full lg:py-0 '>
        <Link href='/'>
          <a>
            <div>
              <Image
                src={logo}
                height='100%'
                width='164px'
                className=' object-contain sm:mx-auto md:mx-0 lg:mx-0 '
                alt='logo'
              />
            </div>
          </a>
        </Link>

        {step <= 2 && (
          <nav
            className={`w-full rounded  font-sans text-[16px] text-[#666665] `}
          >
            <ol className='list-reset flex  md:flex lg:flex-wrap'>
              <li>
                <Link href='/cart' passHref>
                  <a className='text-[#009E64]'>Cart</a>
                </Link>
              </li>
              <li>
                <span className='mx-2'>{'>'}</span>
              </li>
              <li>
                <a href='#' className='text-[#009E64]'>
                  Information
                </a>
              </li>
              <li>
                <span className='mx-2'>{'>'}</span>
              </li>
              <li>
                <span className={`${step >= 1 && 'text-[#009E64]'}`}>
                  Shipping
                </span>
              </li>
              <li>
                <span className='mx-2'>{'>'}</span>
              </li>
              <li>
                {' '}
                <span className={`${step >= 2 && 'text-[#009E64]'} `}>
                  Payment Information
                </span>
              </li>
            </ol>
          </nav>
        )}
        {step === 0 && (
          <CartInformation
            setStep={setStep}
            step={step}
            setData={setData}
            data={data}
          />
        )}

        {step === 1 && (
          <ShippingInformation
            setStep={setStep}
            setData={setData}
            data={data}
          />
        )}
        {step === 2 && (
          <InvoiceInformation setStep={setStep} setData={setData} data={data} />
        )}
      </div>

      <div
        className={` ${step > 1 ? 'hidden' : ''}  flex  flex-1  justify-center`}
      >
        <RightSide step={step} />
      </div>
    </div>
  );
}

export default Payment;
