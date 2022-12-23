import { CallbackCheckboxFilters, FilterType } from '../interfaces/customTypes';
import { IProduct } from '../interfaces/product.interface';

export class CheckboxFilter {
    private selectedCheckboxes: Map<FilterType, Set<string>>;
    private filterType: FilterType;
    private callback: CallbackCheckboxFilters;

    constructor(
        filterType: FilterType,
        callback: CallbackCheckboxFilters
    ) {
        this.selectedCheckboxes = new Map<FilterType, Set<string>>();
        this.filterType = filterType;
        this.selectedCheckboxes.set(filterType, new Set<string>());
        this.callback = callback;
    }

    public generateFilter(data: IProduct[]): void {
        const filter: Element = document.querySelector(
            `.filter_${this.filterType}`
        )!;
        const setFilter: Set<string> = this.generateFilterItems(data);
        setFilter.forEach((item) =>
            filter.appendChild(this.createCheckbox(item))
        );
    }

    private generateFilterItems(data: IProduct[]): Set<string> {
        const setItems = new Set<string>();
        data.forEach((item) => setItems.add(item[this.filterType].toLowerCase()));
        return setItems;
    }

    private createCheckbox(value: string): HTMLElement {
        const filterItem: HTMLElement = document.createElement('div');
        filterItem.classList.add('filter__item');

        const checkbox: HTMLInputElement = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = value;
        checkbox.value = value;
        checkbox.id = value;
        checkbox.classList.add('checkbox');
        checkbox.addEventListener('click', () =>
            this.toggleFilter(checkbox.value.toLowerCase())
        );
        const label = document.createElement('label');
        label.classList.add('label');
        label.htmlFor = checkbox.id;
        label.textContent = value.charAt(0).toUpperCase() + value.slice(1);

        filterItem.appendChild(checkbox);
        filterItem.appendChild(label);

        return filterItem;
    }

    private toggleFilter(value: string): void {
        debugger;
        const setFilterItems = this.selectedCheckboxes.get(this.filterType)!;
        if (setFilterItems.has(value)) {
            setFilterItems.delete(value);
        } else {
            setFilterItems.add(value);
        }
        this.callback(this.selectedCheckboxes);
    }

    public getSelectedCheckboxes(): Map<FilterType, Set<string>> {
        return this.selectedCheckboxes;
    }
}
