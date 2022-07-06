export const searchProductsSelector = (response, state) => {
  return response.filter((product) => {
    return product.name.includes(state.products);
  });
};
