import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
// import Title from './styles/title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteItem from './DeleteItem';
import AddToCart from './AddToCart';

class Item extends Component {
  static propTypes = {
    item: PropTypes.shape({
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      largeImage: PropTypes.string.isRequired
    })
  }

  render() {
    const { item } = this.props;
    return (
      <ItemStyles>
        { item.image && <img src={item.image} alt={item.title}/> }
        {/* <Title> */}
          <Link href={{
            pathname: '/item',
            query: { id: item.id },
          }}>
            <a>{item.title}</a>
          </Link>
          <PriceTag style={{color: "black"}}>
            <p>{formatMoney(item.price)}</p>
          </PriceTag>
          <p>{item.description}</p>
          <div className="buttonList">
            <Link href={{
              pathname:"update",
              query: { id: item.id }
            }}>
              <a>Edit ✏️</a>
            </Link>
            <AddToCart id={item.id} />
            <DeleteItem id={item.id}>Delete This Item</DeleteItem>
          </div>
        {/* </Title> */}
      </ItemStyles>
    );
  }

}

export default Item;
