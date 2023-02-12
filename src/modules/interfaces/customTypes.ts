import { IProduct } from './product.interface';

export type ProductProperty = keyof IProduct;

export type FilterType = 'category' | 'brand';

export type SliderType = 'price' | 'stock';

export type CallbackOnClickCheckbox = (
    filterType: FilterType,
    value: string,
    isAdded: boolean
) => void;

export type CallbackViewChanged = (
    sliderType: SliderType,
    currentSliderValue: SliderValue
) => void;

export type CallbackOnChangeFilters = (
    currentFilters: Map<FilterType, Set<string>>,
    currentSliders: Map<SliderType, SliderValue>,
    searchValue: string,
    sort: string
) => void;

export type ToChangeParamsByCheckbox = (
    param: string,
    value: string,
    isAdd: boolean
) => void;

export type ToChangeParamsBySlider = (
    param: string,
    min: string,
    max: string
) => void;

export type ToChangeParamsBySearch = (param: string, value: string) => void;

export type ToChangeParamsBySort = (param: string) => void;

export type SliderValue = {
    min: number;
    max: number;
};

export type OnButtonCartClick = (event: Event, productId: number) => void;

export type OnChangeSearch = (param: string, searchText: string) => void;

export type OnButtonClick = (type: PageButtons) => void;
// export type OnButtonClick = (type: string) => void;

export type OnProductClick = (id: number) => void;

export type OnSortClick = (sortProperty: string, direction: string) => void;

export enum PageButtons {
    Copy = 'copy',
    Reset = 'reset',
    Buy = 'buy',
    Pay = 'pay',
}
