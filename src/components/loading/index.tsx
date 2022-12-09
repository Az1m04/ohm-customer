import React from 'react';
import Lottie from 'react-lottie';

import loader from '../../assets/Json/loading.json';
function Loading() {
  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: loader,

    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div>
      <Lottie
        className='object-cover '
        height='100px'
        width='100px'
        options={defaultOptions2}
        isClickToPauseDisabled={true}
      />
    </div>
  );
}

export default Loading;
