import { FilterType } from '../interfaces/customTypes';
import { IProduct } from '../interfaces/product.interface';

export class Result {
    public getResult(
        productsData: IProduct[],
        filtersState: Map<FilterType, Set<string>>
    ): IProduct[] {
        let productsResult: Set<IProduct> = new Set<IProduct>();
        debugger;
        if (filtersState.size === 0) {
            productsData.forEach((product) => productsResult.add(product));
        } else {
            productsData.forEach((product) => {
                let addToResult: boolean = true;
                for (let key of filtersState.keys()) {
                    const filterValue: Set<string> = filtersState.get(key)!;
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
        }
        return Array.from(productsResult);
    }
}
