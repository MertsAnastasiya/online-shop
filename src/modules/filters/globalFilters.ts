import { CheckboxFilter } from './checkboxFilters';
import {
    CallbackOnChangeFilters,
    FilterType,
    SliderType,
    SliderValue,
} from '../interfaces/customTypes';
import { IProduct } from '../interfaces/product.interface';
import { DualSlider } from './sliders';
import { Search } from './search';

//I'll change it later when all layout is refactored
const wrapperFiltres: Element = document.querySelector('.filters')!;
const wrapperSliders: Element = document.querySelector('.sliders')!;

export class GlobalFilters {
    private currentFilters: Map<FilterType, Set<string>>;
    private currentSliders: Map<SliderType, SliderValue>;
    private currentSearch: string;
    private callbackOnChangeFilters: CallbackOnChangeFilters;

    constructor(callbackOnChangeFilters: CallbackOnChangeFilters) {
        this.currentFilters = new Map();
        this.currentSliders = new Map();
        this.currentSearch = '';

        this.callbackOnChangeFilters = callbackOnChangeFilters;
    }

    public createFilters(productsData: IProduct[]): void {
        const filterCategory = new CheckboxFilter(
            wrapperFiltres,
            'category',
            (filterType: FilterType, value: string, isAdded: boolean) =>
                this.updateCurrentFiltersState(filterType, value, isAdded)
        );

        const filterBrand = new CheckboxFilter(
            wrapperFiltres,
            'brand',
            (filterType: FilterType, value: string, isAdded: boolean) =>
                this.updateCurrentFiltersState(filterType, value, isAdded)
        );

        const sliderPrice = new DualSlider(
            wrapperSliders,
            0,
            3000,
            '1',
            'price',
            (sliderType: SliderType, currentSliderValue: SliderValue) =>
                this.updateCurrentSliderState(sliderType, currentSliderValue)
        );

        const sliderStock = new DualSlider(
            wrapperSliders,
            0,
            100,
            '1',
            'stock',
            (sliderType: SliderType, currentSliderValue: SliderValue) =>
                this.updateCurrentSliderState(sliderType, currentSliderValue)
        );

        const search = new Search(document.querySelector('.header__container')!, (searchValue: string) => this.onChangeSearch(searchValue));

        filterCategory.drawFilter(productsData);
        filterBrand.drawFilter(productsData);
        sliderPrice.drawSlider();
        sliderStock.drawSlider();

        search.drawSearch();
    }

    public updateCurrentSliderState(
        sliderType: SliderType,
        currentSliderValue: SliderValue
    ): void {
        this.currentSliders.set(sliderType, currentSliderValue);

        this.callbackOnChangeFilters(this.currentFilters, this.currentSliders, this.currentSearch);
    }

    public updateCurrentFiltersState(
        filterType: FilterType,
        value: string,
        isAdded: boolean
    ): void {
        const setSelectedCheckbox =
            this.currentFilters.get(filterType) || new Set<string>();
        isAdded
            ? setSelectedCheckbox?.add(value)
            : setSelectedCheckbox?.delete(value);
        this.currentFilters.set(filterType, setSelectedCheckbox);

        this.callbackOnChangeFilters(this.currentFilters, this.currentSliders, this.currentSearch);
    }

    public getCurrentFilters(): Map<FilterType, Set<string>> {
        return this.currentFilters;
    }

    public getCurrentSliders(): Map<SliderType, SliderValue>  {
        return this.currentSliders;
    }

    public onChangeSearch(search: string): void {
        this.currentSearch = search;
        this.callbackOnChangeFilters(this.currentFilters, this.currentSliders, this.currentSearch);
    }
}
