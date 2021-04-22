import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../contextAPI/context';
import shoppingCartIcon from '../images/shoppingCartIcon.png';
import './ShoppingCart.css';

const ShoppingCart = () => {
  const { productsAtCart,
    handleProductsAtCart,
    totalCart,
    handleProductQuantity,
    itensQuantity } = useContext(AppContext);
  const [finishOrder, changeFinishOrder] = useState(false);

  const pay = () => {
    changeFinishOrder(false);
    handleProductsAtCart([]);
  };

  const renderBody = () => {
    if (productsAtCart.length > 0) {
      return (
        <div id="cart--body">
          <table>
            <thead>
              <tr>
                <th>{null}</th>
                <th>Produto</th>
                <th>Valor Unitário</th>
                <th>Quantidade</th>
                <th>Total</th>
              </tr>
            </thead>
            {productsAtCart
              .map((product) => (
                <tbody key={ product.title }>
                  <tr className="cart--product-tr">
                    <td><img src={ product.image } alt="product-thumbnail" /></td>
                    <td>{ product.title.substring(0, 70) }</td>
                    <td>
                      { product.price
                        .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
                    </td>
                    <td>
                      <button
                        onClick={ () => handleProductQuantity('-', product.id) }
                        type="button"
                      >
                        -
                      </button>
                      { product.qtd }
                      <button
                        onClick={ () => handleProductQuantity('+', product.id) }
                        type="button"
                      >
                        +
                      </button>
                    </td>
                    <td>
                      { (product.price * product.qtd).toLocaleString('pt-BR',
                        { style: 'currency', currency: 'BRL' }) }
                    </td>
                  </tr>
                </tbody>
              ))}

          </table>
          { finishOrder ? (
            <div id="cart--resume-order">
              <h2>
                { `Total: ${totalCart
                  .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` }
              </h2>
              <h4>{ `Itens: ${itensQuantity}` }</h4>
              <select>
                <option value="credit-card">Cartão de Crédito</option>
                <option value="debit-card">Cartão de Débito</option>
                <option value="pix">Pix</option>
              </select>
              <button
                type="button"
                onClick={ pay }
              >
                Pagar
              </button>
            </div>
          )
            : (
              <div id="cart--resume-order">
                <h2>
                  { `Total: ${totalCart
                    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` }
                </h2>
                <h4>{ `Itens: ${itensQuantity}` }</h4>
                <Link to="/"><button type="button">Continuar Comprando</button></Link>
                <button type="button" onClick={ () => changeFinishOrder(true) }>
                  Finalizar Compra
                </button>
                <button
                  onClick={ () => handleProductsAtCart([]) }
                  type="button"
                >
                  Limpar Carrinho
                </button>
              </div>
            ) }
        </div>
      );
    }
    return (
      <div id="cart--empty-cart">
        <h2>
          Carrinho vazio 😟
        </h2>
        <Link to="/" className="cart--link-home">Buscar produtos</Link>
      </div>);
  };

  return (
    <div>
      <header id="cart--header">
        <div id="cart--left-header">
          <img src={ shoppingCartIcon } alt="shopping cart icon" />
          <h2>Online Store</h2>
        </div>
        <h2>Carrinho</h2>
        <div id="cart--right-header">
          <Link to="/" className="cart--link-home">Buscar produtos</Link>
        </div>
      </header>
      <div>
        { renderBody() }
      </div>
    </div>
  );
};

export default ShoppingCart;
