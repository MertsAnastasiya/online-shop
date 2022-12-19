import { IProduct } from './product.interface';

export type ProductProperty = keyof IProduct;
export type CurrentFilter = 'category' | 'brand';
