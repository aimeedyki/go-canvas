import { ReactElement } from 'react';

import './Loader.scss';

const Loader = (): ReactElement => (
  <div className="loader" data-testid="loader">
    <div className="loader__spinner" />
  </div>
);

export default Loader;
