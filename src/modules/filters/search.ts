import { OnChangeSearch } from '../interfaces/customTypes';

 export class Search {
     private parent: Element;
     private onChangeSearch: OnChangeSearch;

     constructor(parent: Element, onChangeSearch: OnChangeSearch) {
         this.parent = parent;
         this.onChangeSearch = onChangeSearch;
     }

     public drawSearch() {
         const inputSearch = document.createElement('input');
         inputSearch.type = 'text';
         inputSearch.classList.add('search');
         inputSearch.placeholder = 'Search product';

         inputSearch.addEventListener('input', () => this.onChangeSearch('search', inputSearch.value));

         this.parent.appendChild(inputSearch);
     }
 }
