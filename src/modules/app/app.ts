import { productsData } from '../data';
import { GlobalFilters } from '../filters/globalFilters';
import { Result } from '../filters/result';
import { FilterType } from '../interfaces/customTypes';
import { ProductViewGenerator } from '../product/product';

export class App {
    private view: ProductViewGenerator;
    private allFilters: GlobalFilters;
    private result: Result;

    constructor() {
        this.allFilters = new GlobalFilters(
            (currentFilters: Map<FilterType, Set<string>>) =>
                this.updateResult(currentFilters)
        );
        this.view = new ProductViewGenerator();
        this.result = new Result();
    }

    public start(): void {
        this.allFilters.createFilters(productsData);
        const startFilters = this.allFilters.getCurrentFilters();

        this.updateResult(startFilters);
    }

    public updateResult(currentFilters: Map<FilterType, Set<string>>): void {
        const array = this.result.getResult(currentFilters);
        this.view.generateProduct(array);
        this.setFoundProducts(array.length);
    }

    private setFoundProducts(count: number): void {
        const found = document.querySelector('.filters__result')!;
        found.innerHTML = `Found: ${count}`;
    }
}
