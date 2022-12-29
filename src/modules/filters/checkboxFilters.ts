import { CallbackOnClickCheckbox, FilterType } from '../interfaces/customTypes';
import { IProduct } from '../interfaces/product.interface';

export class CheckboxFilter {
    private parent: Element;
    private filterType: FilterType;
    private onClickCheckbox: CallbackOnClickCheckbox;

    constructor(
        parent: Element,
        filterType: FilterType,
        onClickCheckbox: CallbackOnClickCheckbox
    ) {
        this.parent = parent;
        this.filterType = filterType;
        this.onClickCheckbox = onClickCheckbox;
    }

    public drawFilter(data: IProduct[]): void {
        const filter: Element = document.createElement('div');
        filter.classList.add(`filter_${this.filterType}`, 'filter');

        const title: Element = document.createElement('div');
        title.classList.add('filter__title');
        title.innerHTML = `${this.filterType
            .charAt(0)
            .toUpperCase()}${this.filterType.slice(1)}`;
        filter.appendChild(title);
        const setFilter: Set<string> = this.generateFilterItems(data);
        setFilter.forEach((item) =>
            filter.appendChild(this.createCheckbox(item))
        );
        this.parent.appendChild(filter);
    }

    private generateFilterItems(data: IProduct[]): Set<string> {
        const setItems = new Set<string>();
        data.forEach((item) =>
            setItems.add(item[this.filterType].toLowerCase())
        );
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
        checkbox.addEventListener('click', () => {
            let isAdded: boolean = false;
            if (checkbox.checked) isAdded = true;
            console.log('isAdded = ' + isAdded);
            this.onClickCheckbox(this.filterType, checkbox.id, isAdded);
        });
        const label = document.createElement('label');
        label.classList.add('label');
        label.htmlFor = checkbox.id;
        label.textContent = value.charAt(0).toUpperCase() + value.slice(1);

        filterItem.appendChild(checkbox);
        filterItem.appendChild(label);

        return filterItem;
    }
}
