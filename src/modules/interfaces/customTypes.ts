import { IProduct } from './product.interface';

export type ProductProperty = keyof IProduct;

export type FilterType = 'category' | 'brand';

export type FilterTypeSliders = 'price' | 'stock';

export type CallbackViewChanged = () => void;

export type CallbackFiltersChanged = (currentFilters: Map<FilterType, Set<string>>, currentSliders:  Map<FilterTypeSliders, SliderValue>) => void;

export type SliderValue = {
    'min': number;
    'max': number;
}
