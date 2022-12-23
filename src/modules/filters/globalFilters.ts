import { CheckboxFilter } from './checkboxFilters';
import {
    CallbackFiltersChanged,
    FilterType,
    FilterTypeSliders,
    SliderValue,
} from '../interfaces/customTypes';
import { IProduct } from '../interfaces/product.interface';
import { DualSlider } from './sliders';

export class GlobalFilters {
    private filterCategory: CheckboxFilter;
    private filterBrand: CheckboxFilter;
    private sliderPrice: DualSlider;
    private sliderStock: DualSlider;
    private currentFilters: Map<FilterType, Set<string>>;
    private currentSliders: Map<FilterTypeSliders, SliderValue>;
    private callbackFilter: CallbackFiltersChanged;

    constructor(callbackFilter: CallbackFiltersChanged) {
        this.currentFilters = new Map();
        this.currentSliders = new Map();

        this.callbackFilter = callbackFilter;

        this.filterCategory = new CheckboxFilter('category', () =>
            this.updateCurrentFilterState()
        );

        this.filterBrand = new CheckboxFilter('brand', () =>
            this.updateCurrentFilterState()
        );

        this.sliderPrice = new DualSlider(0, 3000, '1', 'price', () =>
            this.updateCurrentFilterState()
        );

        this.sliderStock = new DualSlider(0, 100, '1', 'stock', () =>
            this.updateCurrentFilterState()
        );
    }

    public createFilters(productsData: IProduct[]): void {
        this.filterCategory.generateFilter(productsData);
        this.filterBrand.generateFilter(productsData);
    }

    public createSliders() {
        this.sliderPrice.drawSlider();
        this.sliderStock.drawSlider();
    }

    public updateCurrentFilterState(): void {
        this.currentFilters.set(
            this.filterCategory.getFilterType(),
            this.filterCategory.getSelectedCheckboxes()
        );
        this.currentFilters.set(
            this.filterBrand.getFilterType(),
            this.filterBrand.getSelectedCheckboxes()
        );
        this.currentSliders.set(
            this.sliderPrice.getSliderType(),
            this.sliderPrice.getCurrentSliders()
        );
        this.currentSliders.set(
            this.sliderStock.getSliderType(),
            this.sliderStock.getCurrentSliders()
        );

        this.callbackFilter(this.currentFilters, this.currentSliders);
    }

    public getCurrentFilters() {
        return this.currentFilters;
    }

    public getCurrentSliders() {
        return this.currentSliders;
    }
}
