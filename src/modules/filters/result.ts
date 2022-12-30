import { productsData } from '../data';
import { FilterType, ProductProperty, SliderType, SliderValue } from '../interfaces/customTypes';
import { IProduct } from '../interfaces/product.interface';

export class FilterResult {
    public static getFilterResult(
        stateFilters: Map<FilterType, Set<string>>,
        stateSliders: Map<SliderType, SliderValue>,
        searchValue: string
    ): IProduct[] {
        let productsResult: IProduct[] = [];
        productsData.forEach((product) => {
            let addToResult: boolean = false;

            const array: ProductProperty[] = Object.keys(product) as ProductProperty[];

            array.forEach((property) => {
                if(product[property].toString().toLowerCase().includes(searchValue.toLowerCase())) {
                    addToResult = true;
                }
            });

            for (let key of stateFilters.keys()) {
                const filterValue: Set<string> = stateFilters.get(key)!;
                const productPropertyValue: string = product[key].toLowerCase();

                if (
                    filterValue.size !== 0 &&
                    !filterValue.has(productPropertyValue)
                ) {
                    addToResult = false;
                    break;
                }
            }

            for (let key of stateSliders.keys()) {
                const sliderValueMax = stateSliders.get(key)?.max!;
                const sliderValueMin = stateSliders.get(key)?.min!;
                const productPropertyValue: number = product[key];
                if (
                    productPropertyValue >= sliderValueMin &&
                    productPropertyValue <= sliderValueMax
                ) {
                    break;
                } else {
                    addToResult = false;
                    break;
                }
            }
            if (addToResult) {
                productsResult.push(product);
            }
        });
        return productsResult;
    }
}
