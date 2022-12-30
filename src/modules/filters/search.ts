import { OnChangeSearch } from '../interfaces/customTypes';

export class Search {
    private parent: Element;
    private onChangeSearch: OnChangeSearch;

    constructor(parent: Element, onClickSearch: OnChangeSearch) {
        this.parent = parent;
        this.onChangeSearch = onClickSearch;
    }

    public drawSearch() {
        const inputSearch = document.createElement('input');
        inputSearch.type = 'text';
        inputSearch.classList.add('search');
        inputSearch.placeholder = 'Search product';

        inputSearch.addEventListener('input', () => this.onChangeSearch(inputSearch.value));

        this.parent.appendChild(inputSearch);
    }
}
