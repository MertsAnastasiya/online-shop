import { IProduct } from './product.interface';

export type ProductProperty = keyof IProduct;

export type FilterType = 'category' | 'brand';

export type CallbackViewChanged = () => void;

export type CallbackFiltersChanged = (currentFilters: Map<FilterType, Set<string>>) => void;
