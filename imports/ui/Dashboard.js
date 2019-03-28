import React from 'react';

import PrivateHeader from './PrivateHeader';


const Link = () => {
  return (
    <div>
      <PrivateHeader title="Dashboard"/>

      <div className='page-content'>
        Dashboard page content
      </div>
    </div>
  );
};

export default Link;
