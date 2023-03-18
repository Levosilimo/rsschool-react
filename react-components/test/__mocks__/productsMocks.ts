import { IProductsResponse, IResponse } from '../../src/types';

export const emptyRes: IResponse = {
  limit: 0,
  skip: 0,
  total: 0,
  products: [],
};
export const testProduct: IProductsResponse = {
  thumbnail: '',
  images: [],
  stock: 1,
  id: 1,
  title: 'Test product',
  brand: 'Test brand',
  category: 'Test category',
  description: 'Test description',
  price: 11,
  discountPercentage: 15,
  rating: 3.88,
};
export const testProductRes: IResponse = {
  limit: 0,
  skip: 0,
  total: 1,
  products: [testProduct],
};
