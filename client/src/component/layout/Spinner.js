import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const loading = () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt='Loading...'
    />
  </Fragment>
);

export default loading;
