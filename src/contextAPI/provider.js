import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';
import AppContext from './context';

function Provider({ children }) {
  const [products, reloadProducts] = useState([]);
  const [productsAtCart, handleProductsAtCart] = useState([]);
  const [categories, setCategories] = useState([{ name: 'Todas as Categorias' }]);
  const [itensQuantity, setItensQuantity] = useState(0);
  const [totalCart, setTotalCart] = useState(0);

  const newProductAtCart = ({ id, title, qtd, price, image }) => {
    const found = productsAtCart.find((product) => product.id === id);
    if (found) {
      let cartItens = [];
      productsAtCart.forEach((product) => {
        if (product.id === id) {
          cartItens = [
            ...cartItens,
            { id: product.id,
              title: product.title,
              qtd: product.qtd + qtd,
              price: product.price,
              image: product.image,
            },
          ];
        } else {
          cartItens = [
            ...cartItens,
            product,
          ];
        }
      });
      handleProductsAtCart(cartItens);
    } else {
      handleProductsAtCart([
        ...productsAtCart,
        { id, title, qtd, price, image },
      ]);
    }
  };

  const handleProductQuantity = (signal, id) => {
    let productsChanged = [];
    productsAtCart.forEach((product) => {
      if (id === product.id) {
        switch (signal) {
        case '-':
          if (product.qtd > 0) {
            product.qtd -= 1;
          }
          break;
        case '+':
          product.qtd += 1;
          break;
        default:
          break;
        }
      }
      if (product.qtd > 0) {
        productsChanged = [...productsChanged, product];
      }
    });
    handleProductsAtCart(productsChanged);
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('productsAtCart'))) {
      handleProductsAtCart(JSON.parse(localStorage
        .getItem('productsAtCart')));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('productsAtCart',
      JSON.stringify(productsAtCart));
    let qtd = 0;
    let total = 0;
    productsAtCart.forEach((product) => {
      qtd += product.qtd;
      total += product.price * product.qtd;
    });
    setItensQuantity(qtd);
    setTotalCart(total);
  }, [productsAtCart]);

  const data = {
    products,
    reloadProducts,
    productsAtCart,
    newProductAtCart,
    categories,
    setCategories,
    handleProductsAtCart,
    itensQuantity,
    totalCart,
    setTotalCart,
    handleProductQuantity,
  };

  return (
    <AppContext.Provider value={ data }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: node,
}.isRequired;

export default Provider;
