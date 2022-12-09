import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react';
import logo from 'src/assets/img/logo1.png';

const InvoicePrint = React.forwardRef((props: any, ref: any) => {
  const { orderData } = props;
  console.log('orderData', orderData);

  return (
    <div className='bg-white p-6 ' ref={ref}>
      <div className=' flex w-full ' style={{ border: '2px solid black' }}>
        <div className='w-3/4 p-2'>
          <div className='flex w-full flex-row '>
            <div className='w-2/3'>
              <div className='py-2 text-3xl font-semibold uppercase'>
                OHM WhOLESALE
              </div>

              <div className='text-base font-semibold uppercase '>
                846 WOLCOTT ST
              </div>
              <div className='text-base font-semibold uppercase '>
                WATERBURY CT 06705
              </div>
              <div className='flex flex-row '>
                <div
                  className='font-semibold  uppercase '
                  style={{ fontSize: '14px', width: '130px' }}
                >
                  Warehouese
                </div>
                <div className=''>+1 (203) 725-5206</div>
              </div>

              <div className='flex flex-row'>
                <div
                  className='font-semibold  uppercase'
                  style={{ fontSize: '14px', width: '130px' }}
                >
                  Email{' '}
                </div>
                <div className='font-medium'>ohmwholesales@gmail.com</div>
              </div>
              <div className='flex flex-row'>
                <div
                  className='font-semibold  uppercase'
                  style={{ fontSize: '14px', width: '130px' }}
                >
                  Website{' '}
                </div>
                <div className='  font-medium'>
                  https://www.ohmwholesales.com
                </div>
              </div>
            </div>
            <div className='mt-6 '>
              <div className='mt-10 h-[80px] w-[160px] '>
                <Image src={logo} alt='logo' objectFit='cover' />
              </div>
            </div>
          </div>
        </div>
        <div className='w-1/4 ' style={{ borderLeft: '2px solid black' }}>
          <div
            className='text-center text-3xl font-semibold  italic'
            style={{ borderBottom: '2px solid black' }}
          >
            InVoice
          </div>
          <div className='flex w-full flex-row'>
            <div className='w-full'>
              <div
                className='text-center'
                style={{ borderBottom: '2px solid black' }}
              >
                Invoice #
              </div>
              <div
                className='py-2 text-center font-semibold'
                style={{ borderBottom: '2px solid black' }}
              >
                {orderData?.orderId}
              </div>
            </div>
          </div>
          <div className='flex w-full flex-row'>
            <div className='w-1/2 '>
              <div
                className='text-center'
                style={{
                  borderBottom: '2px solid black',
                  borderRight: '2px solid black',
                }}
              >
                Date
              </div>
              <div className='py-2 text-center font-semibold' style={{}}>
                {dayjs(orderData?.createdAt).format('MM-DD-YYYY')}
              </div>
            </div>
            <div className='w-1/2'>
              <div
                className='text-center'
                style={{ borderBottom: '2px solid black' }}
              >
                Due Date
              </div>
              <div className='py-2 text-center font-semibold' style={{}}>
                {dayjs(orderData?.createdAt)
                  .add(15, 'day')
                  .format('MM-DD-YYYY')}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className='flex h-full  w-full'
        style={{ border: '2px solid black' }}
      >
        <div className=' h-full w-1/2'>
          <div style={{ borderRight: '2px solid black' }}>
            <div
              className='h-1/3 p-2 text-base'
              style={{ borderBottom: '2px solid black' }}
            >
              Ship To
            </div>
            <div className='h-2/3 p-2'>
              <div className='uppercase'>{orderData?.user?.companyName}</div>
              <div className='uppercase'>
                {orderData?.address?.address_line_1}
              </div>
              <div className='uppercase'>
                {orderData?.address?.city} ,{orderData?.address?.state_code}
              </div>
              <div className='uppercase'>
                {orderData?.address?.country_code || 'United States Of America'}
              </div>
            </div>
          </div>
        </div>
        <div className=' h-full w-1/2'>
          <div
            className='h-1/3 p-2 text-base'
            style={{ borderBottom: '2px solid black' }}
          >
            Bill To
          </div>
          <div className='p-2 '>
            <div className='uppercase'>{orderData?.user?.companyName}</div>
            <div className='uppercase'>
              {orderData?.user?.address?.address_line_1}
            </div>
            <div className='uppercase'>
              {orderData?.user?.address?.city} ,{orderData?.user?.address?.state_code}
            </div>
            <div className='uppercase'>
              {orderData?.user?.address?.country_code || 'United States Of America'}
            </div>
          </div>
        </div>
      </div>
      <div className=' ' style={{ border: '2px solid black' }}>
        <div className='flex w-full'>
          <div
            className='  font-semibold'
            style={{
              borderRight: '2px solid black',
              fontSize: 13,

              textAlign: 'center',
              height: '30px',
              width: '10%',
              borderBottom: '2px solid black',
            }}
          >
            S.no
          </div>
          <div
            className='w-2/6 px-2 font-semibold '
            style={{
              borderRight: '2px solid black',
              fontSize: 13,

              textAlign: 'center',
              height: '30px',
              width: '50%',

              borderBottom: '2px solid black',
            }}
          >
            Descriptions
          </div>
          <div
            className='  font-semibold'
            style={{
              borderRight: '2px solid black',
              fontSize: 13,
              width: '10%',

              height: '30px',
              borderBottom: '2px solid black',

              textAlign: 'center',
            }}
          >
            Quantity
          </div>
          <div
            className='  font-semibold'
            style={{
              borderRight: '2px solid black',
              fontSize: 13,

              textAlign: 'center',
              width: '10%',

              height: '30px',
              borderBottom: '2px solid black',
            }}
          >
            Tax
          </div>
          <div
            className='  font-semibold'
            style={{
              borderRight: '2px solid black',
              fontSize: 13,

              width: '10%',

              textAlign: 'center',
              height: '30px',

              borderBottom: '2px solid black',
            }}
          >
            Rate
          </div>
          <div
            className='  font-semibold'
            style={{
              fontSize: 13,

              height: '30px',
              width: '10%',

              textAlign: 'center',
              borderBottom: '2px solid black',
            }}
          >
            Amount
          </div>
        </div>

        <div className='w-full' style={{}}>
          {orderData?.productData?.map((item, index) => {
            return (
              <div
                key={item?._id}
                style={{}}
                className='mt-50 flex w-full  text-center'
              >
                <div
                  className=' font-medium '
                  style={{
                    fontSize: 12,

                    textAlign: 'center',
                    borderRight: '2px solid black',
                    height: '60px',
                    display: 'flex',
                    width: '10%',

                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {index + 1}
                </div>
                <div
                  className='w-2/6 px-2'
                  style={{
                    fontSize: 12,
                    textAlign: 'left',
                    borderRight: '2px solid black',
                    height: '60px',
                    display: 'flex',
                    width: '50%',

                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}
                >
                  {item.sku}
                </div>
                <div
                  className=' font-medium '
                  style={{
                    fontSize: 12,

                    textAlign: 'center',
                    borderRight: '2px solid black',
                    height: '60px',
                    display: 'flex',
                    width: '10%',

                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {item.quantity}
                </div>
                <div
                  className=' font-medium '
                  style={{
                    fontSize: 12,

                    textAlign: 'center',
                    borderRight: '2px solid black',
                    height: '60px',
                    display: 'flex',
                    width: '10%',

                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  $
                  {(!!orderData?.address?.state_code === true &&
                    orderData?.address?.state_code === 'Connecticut') ||
                  orderData?.address?.state_code === 'Connecticut CT' ||
                  orderData?.address?.state_code === 'connecticut' ||
                  orderData?.address?.state_code === 'CT' ||
                  orderData?.address?.state_code === 'Connecticut (CT)'
                    ? (
                        (item?.product?.category?.tax / 100) *
                        item?.price *
                        item.quantity
                      ).toFixed(2)
                    : 0}
                </div>
                <div
                  className=' font-medium '
                  style={{
                    fontSize: 12,
                    textAlign: 'center',
                    borderRight: '2px solid black',
                    height: '60px',
                    display: 'flex',
                    width: '10%',

                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  ${item.price}
                </div>

                <div
                  className=' font-medium '
                  style={{
                    fontSize: 12,
                    textAlign: 'center',
                    height: '60px',
                    display: 'flex',
                    width: '10%',

                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  ${item.price * item.quantity}
                </div>
              </div>
            );
          })}
          {/* <div
        className="w-1/6"
        style={{
          borderRight: '2px solid black',
        }}
      >
        {orderData?.productData?.map((item) => {
          return <div key={item?._id} className="text-center  "></div>;
        })}
      </div>
      <div
        className="w-1/6"
        style={{
          borderRight: '2px solid black',
        }}
      >
        {orderData?.productData?.map((item, index) => {
          return <div key={item?._id} className="text-center "></div>;
        })}
      </div>
      <div className="w-1/6" style={{}}>
        {orderData?.productData?.map((item) => {
          return <div key={item?._id} className="text-center "></div>;
        })}
      </div> */}
        </div>
      </div>
      <div
        className='flex h-full w-full'
        style={{
          border: '2px solid black',
        }}
      >
        <div
          className=' p-4'
          style={{
            borderRight: '2px solid black',
            width: '70%',
          }}
        >
          <div className='text-sm'>
            <div>THANKS FOR YOUR BUSINESS.</div>
            <div>
              BUYERS ARE RESPONSIBLE FOR VAPE LOCAL AND STATE TAX FOR OUT OF
              STATE.
            </div>
            <div>ALL SMOKING ACCESSORIES ARE FOR TOBACCO USE ONLY.</div>
            <div>
              ALL THE PRODUCTS WE SELL IS NOT TO BE SOLD TO MINOR +18 OR +21
              (PLEASE CHECK WITH YOUR STATE).
            </div>
            <div>TERMS AND CONDITIONS APPLY.</div>
            <div>
              10% TAX APPLY ON OPEN VAPE , 40C PER ML ON CLOSE PODS SYSTEM ONLY
              FOR CONNECTICUT SHOP.
            </div>
          </div>
        </div>
        <div className=' ' style={{ width: '15%' }}>
          <div
            className=' ext-left mt-2 ml-3  text-sm font-semibold'
            style={{}}
          >
            Sub Total
          </div>
          <div className=' mt-2 ml-3 text-left  text-sm font-semibold'>Tax</div>
          <div className=' mt-2 ml-3 text-left  text-sm font-semibold'>
            Shipping Fee
          </div>
          <div className=' mt-2 ml-3 text-left  text-sm font-semibold'>
            Total
          </div>
        </div>
        <div className=' h-full ' style={{ width: '15%' }}>
          <div className=' mt-2 ml-3 text-left  text-sm font-semibold'>
            ${orderData?.subTotal}
          </div>

          <div className=' mt-2 ml-3 text-left  text-sm font-semibold'>
            ${orderData?.tax || 0}
          </div>
          <div className=' mt-2 ml-3 text-left  text-sm font-semibold'>
            ${orderData?.shippingFee || 0}
          </div>
          <div className=' mt-2 ml-3 text-left  text-sm font-semibold'>
            ${orderData?.total}
          </div>
        </div>
      </div>
    </div>
  );
});

export default InvoicePrint;
