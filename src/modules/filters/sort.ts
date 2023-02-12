import { OnSortClick } from '../interfaces/customTypes';

export class ProductsSorter {
    public sortProperty: string;
    public sortDirection: string;
    private parent: Element;
    private onSortClick: OnSortClick;

    constructor(parent: Element, type: string, onSortClick: OnSortClick) {
        this.sortProperty = type;
        this.parent = parent;
        this.onSortClick = onSortClick;
        this.sortDirection = 'desc';
    }

    drawSortField() {
        const sort = document.createElement('div');
        sort.classList.add('sort');
        sort.classList.add(`sort__${this.sortProperty}`);
        sort.innerText = this.sortProperty;

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
