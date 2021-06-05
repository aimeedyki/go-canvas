import { FC } from 'react';

import './Header.scss';

const Header: FC = () => {
  return (
    <header className="header">
      <h3 className="header__logo">GoCanvas</h3>
      <div className="header__tools">
        <h3>tools</h3>
      </div>
    </header>
  );
};

export default Header;
