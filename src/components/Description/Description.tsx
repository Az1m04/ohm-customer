import React from 'react';

interface DescriptionPropsInterface {
  title: string;
  description: string;
}

const Description = ({ title, description }: DescriptionPropsInterface) => {
  return (
    <div className='my-5 flex items-center justify-between'>
      <p className='ml-9 font-medium text-gray-600'>{title}</p>
      <p className='mr-5 w-1/2 pr-5 text-base text-gray-700'>{description}</p>
    </div>
  );
};

export default Description;
