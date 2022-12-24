import { productsData } from '../data';
import { GlobalFilters } from '../filters/globalFilters';
import { Result } from '../filters/result';
import {
    FilterType,
    FilterTypeSliders,
    SliderValue,
} from '../interfaces/customTypes';
import { IProduct } from '../interfaces/product.interface';
import { ProductViewGenerator } from '../product/product';

export class App {
    private view: ProductViewGenerator;
    private allFilters: GlobalFilters;
    private result: Result;

    constructor() {
        this.allFilters = new GlobalFilters(
            (
                currentFilters: Map<FilterType, Set<string>>,
                currentSliders: Map<FilterTypeSliders, SliderValue>
            ) => this.updateResult(currentFilters, currentSliders)
        );
        this.view = new ProductViewGenerator();
        this.result = new Result();
    }

    public start(): void {
        this.allFilters.createFilters(productsData);
        this.allFilters.createSliders();

        const startFilters: Map<FilterType, Set<string>> = this.allFilters.getCurrentFilters();
        const startSliders: Map<FilterTypeSliders, SliderValue> = this.allFilters.getCurrentSliders();
        this.updateResult(startFilters, startSliders);
    }

    public updateResult(
        currentFilters: Map<FilterType, Set<string>>,
        slidersValue: Map<FilterTypeSliders, SliderValue>
    ): void {
        const array: IProduct[] = this.result.getResult(currentFilters, slidersValue);
        this.view.generateProduct(array);
        this.setFoundProducts(array.length);
    }

    private setFoundProducts(count: number): void {
        const found: Element = document.querySelector('.filters__result')!;
        found.innerHTML = `Found: ${count}`;
    }
}
