import React, { useRef, useState } from 'react';

import Icon2 from '../../../../public/images/icon2.svg';
import Icon22 from '../../../../public/images/icon22.svg';

type AccordionProps = {
  title: string;
  content: string;
};
const Accordion = ({ title, content }: AccordionProps) => {
  const [isOpened, setOpened] = useState<boolean>(false);
  const [height, setHeight] = useState<string>('0px');
  const contentElement = useRef<HTMLDivElement>(null);

  const HandleOpening = () => {
    setOpened(!isOpened);
    setHeight(!isOpened ? `${contentElement?.current?.scrollHeight}px` : '0px');
  };
  return (
    <div className='grid grid-flow-row grid-cols-2  space-x-4'>
      <div
        onClick={HandleOpening}
        className='border border-gray-300 bg-slate-400'
      >
        <div className='flex justify-between bg-white p-4 text-lg font-bold text-[#4f46e5]'>
          <h4 className='text-[20px] font-semibold text-black'>
            What really is a Free Listing?
          </h4>
          {isOpened ? <Icon2 /> : <Icon22 />}
        </div>
        <div
          ref={contentElement}
          style={{ height: height }}
          className='overflow-hidden bg-white transition-all duration-200'
        >
          <p className='p-4 text-left text-black'>
            Free Listing really means that listing your property on Square Yards
            attracts Zero Costs, today and forever! Try our award-winning
            services by listing a Property Now… Free!
          </p>
        </div>
      </div>
      <div
        onClick={HandleOpening}
        className='border border-gray-300 bg-slate-400'
      >
        <div className='flex justify-between bg-white p-4 text-lg font-bold text-[#4f46e5]'>
          <h4 className='text-[20px] font-semibold text-black'>
            What really is a Free Listing?
          </h4>
          {isOpened ? <Icon2 /> : <Icon22 />}
        </div>
        <div
          ref={contentElement}
          style={{ height: height }}
          className='overflow-hidden bg-white transition-all duration-200'
        >
          <p className='p-4 text-left text-black'>
            Free Listing really means that listing your property on Square Yards
            attracts Zero Costs, today and forever! Try our award-winning
            services by listing a Property Now… Free!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
