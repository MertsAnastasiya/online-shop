import { productsData } from '../data';
import { GlobalFilters } from '../filters/globalFilters';
import { Result } from '../filters/result';
import { FilterType } from '../interfaces/customTypes';
import { IProduct } from '../interfaces/product.interface';
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
        this.view  = new ProductViewGenerator();
        this.result = new Result();
    }

    public start(): void {
        this.allFilters.createFilters(productsData);
        const startFilters = this.allFilters.getCurrentFilters();
        this.updateResult(startFilters);
    }

    public updateResult(
        currentFilters: Map<FilterType, Set<string>>
    ): void {
        const arrayResult = this.result.getResult(productsData, currentFilters);
        this.view.generateProduct(arrayResult);
    }
}
