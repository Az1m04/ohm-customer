import { useRouter } from 'next/router';
import React from 'react';

const TitleProduct = () => {
  const { route } = useRouter();
  return (
    <title>
      {`OHM Wholesale | ${
        route?.length === 1 ? ' HOME' : route?.replace('/', '').toUpperCase()
      }`}
    </title>
  );
};

export default TitleProduct;
