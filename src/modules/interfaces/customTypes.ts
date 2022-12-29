import { IProduct } from './product.interface';

export type ProductProperty = keyof IProduct;

export type FilterType = 'category' | 'brand';

export type SliderType = 'price' | 'stock';

export type CallbackOnClickCheckbox = (filterType: FilterType, value: string, isAdded: boolean) => void;

export type CallbackViewChanged = (sliderType: SliderType, currentSliderValue: SliderValue) => void;

export type CallbackOnChangeFilters = (currentFilters: Map<FilterType, Set<string>>, currentSliders:  Map<SliderType, SliderValue>) => void;

export type SliderValue = {
    'min': number;
    'max': number;
};

export type OnButtonCartClick = (productId: number, isAdded: boolean) => void;
