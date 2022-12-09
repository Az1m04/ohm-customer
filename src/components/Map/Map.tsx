import React from 'react';

const Map = () => {
  return (
    <div className='map h-96 w-full'>
      <iframe
        src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d765938.610888845!2d73.03023!3d19.107596!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e1!3m2!1sen!2sin!4v1648654819642!5m2!1sen!2sin'
        // width='600'
        // height='450'
        loading='lazy'
        className='h-96 w-full'
        referrerPolicy='no-referrer-when-downgrade'
      ></iframe>
    </div>
  );
};

export default Map;
