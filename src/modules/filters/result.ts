import { productsData } from '../data';
import { FilterType } from '../interfaces/customTypes';
import { IProduct } from '../interfaces/product.interface';

export class Result {
    public getResult(stateFilters: Map<FilterType, Set<string>>): IProduct[] {
            let productsResult: Set<IProduct> = new Set<IProduct>();
            productsData.forEach((product) => {
                let addToResult: boolean = true;
                for (let key of stateFilters.keys()) {
                    const filterValue: Set<string> = stateFilters.get(key)!;
                    const productPropertyValue: string =
                        product[key].toLowerCase();

                    if (
                        filterValue.size !== 0 &&
                        !filterValue.has(productPropertyValue)
                    ) {
                        addToResult = false;
                        break;
                    }
                }

                if (addToResult) {
                    productsResult.add(product);
                }
            });
            return Array.from(productsResult);
    }
}
