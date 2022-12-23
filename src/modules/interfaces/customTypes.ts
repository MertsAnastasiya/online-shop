import { IProduct } from './product.interface';

export type ProductProperty = keyof IProduct;
export type FilterType = 'category' | 'brand';

export type CallbackGlobalFilters = (filters: Map<FilterType, Set<string>>) => IProduct[];
export type CallbackCheckboxFilters = (clientsCheckboxes: Map<FilterType, Set<string>>) => void;
