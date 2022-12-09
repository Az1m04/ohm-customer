import React from 'react';

const BottomFooter = () => {
  return (
    <div className=' bg-[#007B4B] py-5  text-center'>
      <div className=' text-[15px] text-white '>
        Copyright © {new Date().getFullYear()} OHM wholesale. All rights
        reserved.
      </div>
    </div>
  );
};

export default BottomFooter;
