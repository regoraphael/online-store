import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../contextAPI/context';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import loadingGif from '../images/loading_blue.gif';
import shoppingCartIcon from '../images/shoppingCartIcon.png';
import './Home.css';

const Home = () => {
  const {
    categories,
    setCategories,
    products,
    reloadProducts,
    newProductAtCart,
    itensQuantity,
    totalCart,
  } = useContext(AppContext);

  const [indexSelectedCategory, changeIndexSelectedCategory] = useState(0);
  const [loading, changeLoadingState] = useState(true);
  const [query, changeQuery] = useState('');

  useEffect(() => {
    getCategories().then((result) => {
      setCategories([
        ...categories,
        ...result,
      ]);
    });
    getProductsFromCategoryAndQuery()
      .then((data) => {
        reloadProducts(data.results);
      });
    changeLoadingState(false);
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      changeLoadingState(true);
      getProductsFromCategoryAndQuery(categories[indexSelectedCategory].id, query)
        .then((data) => {
          reloadProducts(data.results);
          changeLoadingState(false);
        });
    }
  }, [indexSelectedCategory, query]);

  const returnCategories = () => (
    <div>
      <select
        defaultValue={ categories[indexSelectedCategory].name }
        onChange={ ({ target }) => {
          categories.forEach(({ name }, index) => {
            if (name === target.value) {
              changeIndexSelectedCategory(index);
            }
          });
        } }
      >
        { categories.map(({ name, id }) => (
          <option
            key={ id }
          >
            { name }
          </option>
        )) }
      </select>
    </div>
  );

  return (
    <div>
      <header id="home--header">
        <div id="home--left-header">
          <img src={ shoppingCartIcon } alt="shopping cart icon" />
          <h2>Online Store</h2>
        </div>
        <div id="home--search">
          <input
            placeholder="Digite o produto que deseja"
            type="text"
            onChange={ ({ target: { value } }) => changeQuery(value.replace(' ', '%20')) }
            maxLength="45"
          />
          { categories.length > 0 && returnCategories() }
        </div>
        { itensQuantity === 0 ? <h4>Carrinho vazio</h4>
          : (
            <div id="home--right-header">
              <p>{ `Itens no carrinho: ${itensQuantity}` }</p>
              <p>
                { `Total: ${totalCart.toLocaleString('pt-BR',
                  { style: 'currency', currency: 'BRL' })}` }
              </p>
              <Link to="/shopping-cart" id="home--link-cart">Ver Carrinho</Link>
            </div>
          ) }
      </header>
      { products.length > 0 && !loading
        ? (
          <div id="home--products-table">
            {products
              .map((product, index) => (
                <div className="home--product-card" key={ product.id }>
                  <h4>{ product.title }</h4>
                  <div style={ { height: '150px' } }>
                    <img
                      src={ product.thumbnail }
                      alt={ `thumbnail ${product.name}` }
                      style={ { maxWidth: '100%',
                        maxHeight: '150px' } }
                    />
                  </div>
                  <h4>
                    {`Preço: ${product.price.toLocaleString('pt-BR',
                      { style: 'currency', currency: 'BRL' })}`}
                  </h4>
                  <label htmlFor="quantity">
                    <span>Quantidade:</span>
                    <input
                      className="input-qtd"
                      type="number"
                      min="1"
                      defaultValue="1"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={ () => {
                      newProductAtCart({
                        id: product.id,
                        title: product.title,
                        qtd: parseFloat(document
                          .getElementsByClassName('input-qtd')[index].value),
                        price: product.price,
                        image: product.thumbnail,
                      });
                    } }
                  >
                    Adicionar ao Carrinho
                  </button>
                  <button type="button">Ver Detalhes</button>
                </div>
              ))}
          </div>
        )
        : (
          <div id="home--loading">
            <img src={ loadingGif } alt="loading-gif" />
          </div>
        ) }
    </div>
  );
};

export default Home;
