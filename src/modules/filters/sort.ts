import { OnSortClick } from '../interfaces/customTypes';

export class ProductsSorter {
    public readonly sortProperty: string;
    public sortDirection: string;
    private readonly parent: Element;
    private readonly onSortClick: OnSortClick;

    constructor(parent: Element, sortProperty: string, onSortClick: OnSortClick) {
        this.sortProperty = sortProperty;
        this.parent = parent;
        this.onSortClick = onSortClick;
        this.sortDirection = 'desc';
    }

    public drawSortField(): void {
        const sort: Element = document.createElement('div');
        sort.classList.add('sort');
        sort.classList.add(`sort__${this.sortProperty}`);
        sort.textContent = this.sortProperty;

        sort.addEventListener('click', () => {
            if (this.sortDirection === 'asc') {
                this.sortDirection = 'desc';
            } else if (this.sortDirection === 'desc') {
                this.sortDirection = 'asc';
            }
            this.onSortClick(this.sortProperty, this.sortDirection);
        });

        this.parent.appendChild(sort);
    }
}
