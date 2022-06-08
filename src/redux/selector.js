import { PRODUCTS } from "~/data";

export const searchProductsSelector = (state) => {
  return PRODUCTS.filter((product) => {
    return product.name.includes(state.products.search);
  });
};
