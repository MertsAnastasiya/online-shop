import { CheckboxFilter } from './checkboxFilters';
import { CallbackFiltersChanged, FilterType } from '../interfaces/customTypes';
import { IProduct } from '../interfaces/product.interface';

export class GlobalFilters {
    private filterCategory: CheckboxFilter;
    private filterBrand: CheckboxFilter;
    private currentFilters: Map<FilterType, Set<string>>;
    private callbackFilter: CallbackFiltersChanged;

    constructor(callbackFilter: CallbackFiltersChanged) {
        this.currentFilters = new Map();
        this.callbackFilter = callbackFilter;

        this.filterCategory = new CheckboxFilter('category', () =>
            this.updateCurrentFilterState()
        );

        this.filterBrand = new CheckboxFilter('brand', () =>
            this.updateCurrentFilterState()
        );
    }

    public createFilters(productsData: IProduct[]): void {
        this.filterCategory.generateFilter(productsData);
        this.filterBrand.generateFilter(productsData);
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

        this.callbackFilter(this.currentFilters);
    }

    public getCurrentFilters() {
        return this.currentFilters;
    }
}
