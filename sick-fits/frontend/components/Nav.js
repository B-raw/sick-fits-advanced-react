import Link from 'next/link';
import User from './User'

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
