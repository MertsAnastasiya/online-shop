import { onSortClick } from '../interfaces/customTypes';

export class Sort {
    public sortProperty: string;
    public sortDirection: string;
    private parent: Element;
    private onSortClick: onSortClick;

    constructor(parent: Element, type: string, onSortClick: onSortClick) {
        this.sortProperty = type;
        this.parent = parent;
        this.onSortClick = onSortClick;
        this.sortDirection = 'none';
    }

    drawSortField() {
        const sort = document.createElement('div');
        sort.classList.add('sort');
        sort.classList.add(`sort__${this.sortProperty}`);
        sort.innerText = this.sortProperty;

        sort.addEventListener('click', () => {
            if (this.sortDirection === 'none' || this.sortDirection === 'asc') {
                this.sortDirection = 'desc';
            } else if (this.sortDirection === 'desc') {
                this.sortDirection = 'asc';
            }
            this.onSortClick(this.sortProperty, this.sortDirection);
        });

        this.parent.appendChild(sort);
    }
}
