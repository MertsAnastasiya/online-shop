import { OnChangeSearch } from '../interfaces/customTypes';

 export class Search {
     private readonly parent: Element;
     private readonly onChangeSearch: OnChangeSearch;

     constructor(parent: Element, onChangeSearch: OnChangeSearch) {
         this.parent = parent;
         this.onChangeSearch = onChangeSearch;
     }

     public drawSearch(): void {
         const inputSearch: HTMLInputElement = document.createElement('input');
         inputSearch.type = 'text';
         inputSearch.classList.add('search');
         inputSearch.placeholder = 'Search product';

         inputSearch.addEventListener('input', () => this.onChangeSearch('search', inputSearch.value));

         this.parent.appendChild(inputSearch);
     }
 }
