import React from 'react';
import Nav from './Nav';
import Cart from './Cart'
import Search from './Search'

const Header = ({}) => (
  <div>
    <div className="bar">
      <a href="">Sick Fits</a>
      <Nav />
    </div>
    <div className="sub-bar">
      <Search />
    </div>
    <div>
      <Cart></Cart>
    </div>
  </div>
);

export default Header;
