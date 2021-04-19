import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { incrementProduct } from '../services/dataservices';

class ProductCard extends React.Component {
  render() {
    const { title, image, price, productId, counter, availableQnt } = this.props;
    return (
      <div data-testid="product">
        <h1>{ title }</h1>
        <img src={ image } alt={ title } />
        <p>{ price }</p>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => {
            incrementProduct({
              title,
              image,
              price,
              productId,
              quantity: 1,
              availableQnt });
            counter('click');
          } }
        >
          Adicionar ao Carrinho
        </button>
        <Link
          to={ {
            pathname: `/product/${productId}`,
            state: { title, image, price, productId } } }
          data-testid="product-detail-link"
        >
          Ver Detalhes
        </Link>
      </div>
    );
  }
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  productId: PropTypes.string.isRequired,
  counter: PropTypes.func.isRequired,
  availableQnt: PropTypes.number.isRequired,
};

export default ProductCard;
