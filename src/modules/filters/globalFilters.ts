import { CheckboxFilter } from './checkboxFilters';
import {
    CallbackOnChangeFilters,
    FilterType,
    SliderType,
    SliderValue,
} from '../interfaces/customTypes';
import { IProduct } from '../interfaces/product.interface';
import { DualSlider } from './sliders';

//I'll change it later when all layout is refactored
const wrapperFiltres: Element = document.querySelector('.filters')!;
const wrapperSliders: Element = document.querySelector('.sliders')!;

export class GlobalFilters {
    private filterCategory: CheckboxFilter;
    private filterBrand: CheckboxFilter;
    private sliderPrice: DualSlider;
    private sliderStock: DualSlider;
    private currentFilters: Map<FilterType, Set<string>>;
    private currentSliders: Map<SliderType, SliderValue>;
    private callbackOnChangeFilters: CallbackOnChangeFilters;

    constructor(callbackFilter: CallbackOnChangeFilters) {
        this.currentFilters = new Map();
        this.currentSliders = new Map();

        this.callbackOnChangeFilters = callbackFilter;

        this.filterCategory = new CheckboxFilter(
            wrapperFiltres,
            'category',
            (filterType: FilterType, value: string, isAdded: boolean) =>
                this.updateCurrentFiltersState(filterType, value, isAdded)
        );

        this.filterBrand = new CheckboxFilter(
            wrapperFiltres,
            'brand',
            (filterType: FilterType, value: string, isAdded: boolean) =>
                this.updateCurrentFiltersState(filterType, value, isAdded)
        );

        this.sliderPrice = new DualSlider(
            wrapperSliders,
            0,
            3000,
            '1',
            'price',
            (sliderType: SliderType, currentSliderValue: SliderValue) =>
                this.updateCurrentSliderState(sliderType, currentSliderValue)
        );

        this.sliderStock = new DualSlider(
            wrapperSliders,
            0,
            100,
            '1',
            'stock',
            (sliderType: SliderType, currentSliderValue: SliderValue) =>
                this.updateCurrentSliderState(sliderType, currentSliderValue)
        );
    }

    public createFilters(productsData: IProduct[]): void {
        this.filterCategory.drawFilter(productsData);
        this.filterBrand.drawFilter(productsData);
    }

    public createSliders() {
        this.sliderPrice.drawSlider();
        this.sliderStock.drawSlider();
    }

    public updateCurrentSliderState(
        sliderType: SliderType,
        currentSliderValue: SliderValue
    ): void {
        this.currentSliders.set(sliderType, currentSliderValue);

        this.callbackOnChangeFilters(this.currentFilters, this.currentSliders);
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

        this.callbackOnChangeFilters(this.currentFilters, this.currentSliders);
    }

    public getCurrentFilters() {
        return this.currentFilters;
    }

    public getCurrentSliders() {
        return this.currentSliders;
    }
}
