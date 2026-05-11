const axios = require("axios");
const getProductByIdFromProductService = async (productId) => {
const response = await axios.get(
`${process.env.PRODUCT_SERVICE_URL}/api/products/${productId}`
);
return response.data;
};
module.exports = {
getProductByIdFromProductService,
};