import { productsData } from '../data';
import { GlobalFilters } from '../filters/globalFilters';
import { FilterResult } from '../filters/result';
import {
    FilterType,
    FilterTypeSliders,
    SliderValue,
} from '../interfaces/customTypes';
import { IProduct } from '../interfaces/product.interface';
import { ProductsViewGenerator } from '../product/ProductsViewGenerator';

export class App {
    private view: ProductsViewGenerator;
    private globalFiltres: GlobalFilters;

    constructor() {
        this.globalFiltres = new GlobalFilters(
            (
                currentFilters: Map<FilterType, Set<string>>,
                currentSliders: Map<FilterTypeSliders, SliderValue>
            ) => this.updateResult(currentFilters, currentSliders)
        );
        this.view = new ProductsViewGenerator();
    }

    public start(): void {
        this.globalFiltres.createFilters(productsData);
        this.globalFiltres.createSliders();

        const startFilters: Map<FilterType, Set<string>> = this.globalFiltres.getCurrentFilters();
        const startSliders: Map<FilterTypeSliders, SliderValue> = this.globalFiltres.getCurrentSliders();
        this.updateResult(startFilters, startSliders);
    }

    public updateResult(
        currentFilters: Map<FilterType, Set<string>>,
        slidersValue: Map<FilterTypeSliders, SliderValue>
    ): void {
        const array: IProduct[] = FilterResult.getFilterResult(currentFilters, slidersValue);
        this.view.generateProduct(array);
        this.setFoundProducts(array.length);
    }

    private setFoundProducts(count: number): void {
        const found: Element = document.querySelector('.filters__result')!;
        found.innerHTML = `Found: ${count}`;
    }
}
