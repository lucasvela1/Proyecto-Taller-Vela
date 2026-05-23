import { ProductSearchResponse } from "../services/productos.service";

export function transformSearchProductsResponse(
  response: ProductSearchResponse,
): MyProductSearchResponse {
  let myResponse: MyProductSearchResponse = {
    count: response.count,
    page: response.page,
    page_count: response.page_count,
    page_size: response.page_size,
    products: [],
  };

  myResponse.products = response.products.map((product) => {
    return {
      id: product._id,
      name: product.product_name,
    };
  });

  return myResponse;
}

type MyProductSearchResponse = {
  count: number;
  page: number;
  page_count: number;
  page_size: number;
  products: MyProduct[];
};

type MyProduct = {
  id: string;
  name: string;
};
