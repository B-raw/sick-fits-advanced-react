import Link from 'next/link';
import User from './User';
import Signout from './Signout';

const Nav = ({}) => (
  <User>
    {({ data : { me }}) => (

      <div>
         <Link href="/items">
          <a>Shop</a>
        </Link>
        {me && (
          <>
            <Link href="/sell">
              <a>Sell</a>
            </Link>
            <Link href="/orders">
              <a>Orders</a>
            </Link>
            <Link href="/me">
              <a>Account</a>
            </Link>
            <Signout />
          </>
        )}
        {!me && (
          <Link href="/signup">
            <a>Signup</a>
          </Link>
        )}
      </div>
    )}
  </User>
);

export default Nav;
