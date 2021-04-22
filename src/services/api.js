export async function getCategories() {
  try {
    const endpoint = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
    const promise = await endpoint.json();
    return promise;
  } catch (error) {
    console.log(error);
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  try {
    let cat = `category=${categoryId}&`;
    let queryWords = '';
    if (query) {
      queryWords = `q=${query}`;
    }
    if (!categoryId) {
      cat = '';
    }
    if (!categoryId && !query) {
      queryWords = 'q=ofertas';
    }
    const endpoint = await fetch(`https://api.mercadolibre.com/sites/MLB/search?${cat}${queryWords}`);
    const promise = await endpoint.json();
    return promise;
  } catch (error) {
    console.log(error);
  }
}

export async function getProductFromId(id) {
  try {
    const endpoint = await fetch(`https://api.mercadolibre.com/items?ids=${id}`);
    const promise = await endpoint.json();
    return promise;
  } catch (error) {
    console.log(error);
  }
}
