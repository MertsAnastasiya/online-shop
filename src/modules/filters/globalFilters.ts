import { CheckboxFilter } from './checkboxFilters';
import { CallbackGlobalFilters, FilterType } from '../interfaces/customTypes';
import { IProduct } from '../interfaces/product.interface';

export class GlobalFilters {
    private currentFilters: Map<FilterType, Set<string>>;
    private filterCategory: CheckboxFilter;
    private filterBrand: CheckboxFilter;
    private callback: CallbackGlobalFilters;

    constructor(callback: CallbackGlobalFilters) {
        this.callback = callback;
        this.currentFilters = new Map<FilterType, Set<string>>();
        this.filterCategory = new CheckboxFilter(
            'category',
            (selectedCheckboxes: Map<FilterType, Set<string>>) =>
                this.updateCurrentFiltersByCheckboxes(selectedCheckboxes)
        );
        this.filterBrand = new CheckboxFilter(
            'brand',
            (selectedCheckboxes: Map<FilterType, Set<string>>) =>
                this.updateCurrentFiltersByCheckboxes(selectedCheckboxes)
        );
    }

    public createFilters(productsData: IProduct[]): void {
        this.filterCategory.generateFilter(productsData);
        this.filterBrand.generateFilter(productsData);
    }

    public updateCurrentFiltersByCheckboxes(
        selectedCheckboxes: Map<FilterType, Set<string>>
    ): void {
        for (const key of selectedCheckboxes.keys()) {
            if (selectedCheckboxes.get(key)) {
                this.currentFilters.set(key, selectedCheckboxes.get(key)!);
            }
        }
        this.callback(this.currentFilters);
    }

    public getCurrentFilters() {
        return this.currentFilters;
    }
}
