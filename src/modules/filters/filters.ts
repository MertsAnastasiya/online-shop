import { IProduct } from '../interfaces/product.interface';
import { FilterType } from '../interfaces/customTypes';
import { productsData } from '../data';

export class Filters {
    private selectedFiltres: Map<FilterType, Set<string>>;
    private resultFilterProduct: Set<IProduct>;

    constructor() {
        this.selectedFiltres = new Map<FilterType, Set<string>>();
        this.selectedFiltres.set('category', new Set<string>());
        this.selectedFiltres.set('brand', new Set<string>());
        this.resultFilterProduct = new Set<IProduct>();
    }

    public generateFilter(data: IProduct[], filterType: FilterType): void {
        const filter: Element = document.querySelector(`.filter_${filterType}`)!;
        const setFilter: Set<string> = this.generateFilterItems(data, filterType);
        setFilter.forEach((item) => filter.appendChild(this.createCheckbox(item, filterType)));
    }

    private generateFilterItems(data: IProduct[], filterType: FilterType): Set<string> {
        const setItems = new Set<string>();
        data.forEach((item) => setItems.add(item[filterType]));
        return setItems;
    }

    private createCheckbox(value: string, filterType: FilterType): HTMLElement {
        const filterItem: HTMLElement = document.createElement('div');
        filterItem.classList.add('filter__item');

        const checkbox: HTMLInputElement = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = value;
        checkbox.value = value;
        checkbox.id = value;
        checkbox.classList.add('checkbox');
        checkbox.addEventListener('click', () => this.viewFiltersResult(checkbox.id, filterType));
        const label = document.createElement('label');
        label.classList.add('label');
        label.htmlFor = checkbox.id;
        label.textContent = value;

        filterItem.appendChild(checkbox);
        filterItem.appendChild(label);

        return filterItem;
    }

    private viewFiltersResult(filterValue: string, filterType: FilterType): void {
        this.toggleFilter(filterValue.toLowerCase(), filterType);
        this.resultFilterProduct.clear();
        productsData.forEach((product) => {
            let addToResult = true;
            for (const key of this.selectedFiltres.keys()) {
                const filterValuesForType: Set<string> = this.selectedFiltres.get(key)!;
                const productPropertyValue: string = product[key].toLowerCase();
                if (filterValuesForType.size !== 0 && !filterValuesForType.has(productPropertyValue)) {
                    addToResult = false;
                    break;
                }
            }
            if (addToResult) {
                this.resultFilterProduct.add(product);
            }
        });
        console.log(this.resultFilterProduct); //I'm using it to show the result while we're thinking about function generateProduct()
    }

    private toggleFilter(value: string, filterType: FilterType): void {
        const setFilterItems = this.selectedFiltres.get(filterType)!;
        if (setFilterItems.has(value)) {
            setFilterItems.delete(value);
        } else {
            setFilterItems.add(value);
        }
    }
}
