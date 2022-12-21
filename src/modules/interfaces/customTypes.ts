import { IProduct } from './product.interface';

export type ProductProperty = keyof IProduct;
export type FilterType = 'category' | 'brand';
