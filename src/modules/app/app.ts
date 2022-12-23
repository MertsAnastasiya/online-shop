import { productsData } from '../data';
import { GlobalFilters } from '../filters/globalFilters';
import { Result } from '../filters/result';
import { FilterType } from '../interfaces/customTypes';
import { IProduct } from '../interfaces/product.interface';
import { ProductViewGenerator } from '../product/product';

export class App {
    private allFilters: GlobalFilters;
    private result: Result;

    constructor() {
        this.allFilters = new GlobalFilters(
            (currentFilters: Map<FilterType, Set<string>>) =>
                this.updateResult(currentFilters)
        );
        this.result = new Result();
    }

    public start(): void {
        const arrayResult = this.result.getResult(
            productsData,
            this.allFilters.getCurrentFilters()
        );
        ProductViewGenerator.generateProduct(arrayResult);
        this.allFilters.createFilters(productsData);
    }

    public updateResult(
        currentFilters: Map<FilterType, Set<string>>
    ): IProduct[] {
        const arrayResult = this.result.getResult(productsData, currentFilters);
        ProductViewGenerator.generateProduct(arrayResult);
        return arrayResult;
    }
}
