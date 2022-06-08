export const searchProductChange = (text) => {
  return {
    type: "products/searchProductChange",
    payload: text,
  };
};
