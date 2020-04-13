import Link from 'next/link';
import User from './User'

const Nav = ({}) => (
  <div>
  <User>
    {({ data : { me }}) => {
      console.log(me)
      if(me) return <p>{me.name}</p>
      return null;
    }}
  </User>
  <Link href="/items">
    <a>Shop</a>
  </Link>
    <Link href="/sell">
      <a>Sell</a>
    </Link>
    <Link href="/signup">
      <a>Signup</a>
    </Link>
    <Link href="/orders">
      <a>Orders</a>
    </Link>
    <Link href="/me">
      <a>Account</a>
    </Link>
  </div>
);

export default Nav;
