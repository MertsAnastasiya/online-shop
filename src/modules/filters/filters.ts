import { IProduct } from '../interfaces/product.interface';
import { CurrentFilter } from '../interfaces/customTypes';
import { productsData } from '../data';

export class Filters {
  private selectedFiltres: Map<CurrentFilter, Set<string>>;
  private resultFilterProduct: Set<IProduct>;

  constructor() {
    this.selectedFiltres = new  Map<CurrentFilter, Set<string>>();
    this.selectedFiltres.set('category', new Set<string>());
    this.selectedFiltres.set('brand', new Set<string>());
    this.resultFilterProduct = new Set<IProduct>();
  }

  public generateFilter(data: IProduct[], filterType: CurrentFilter): void {
    const filter = document.querySelector(`.filter_${filterType}`)!;
    const setFilter: Set<string> = this.generateFilterItems(data, filterType);
    setFilter.forEach((item) => filter.appendChild(this.createCheckbox(item, filterType)));
  }

  private generateFilterItems(data: IProduct[], filterType: CurrentFilter): Set<string>  {
    const setItems = new Set<string>();
    data.forEach((item) => setItems.add(item[filterType]));
    return setItems;
  }

  private createCheckbox(value: string, filterType: CurrentFilter): HTMLElement {
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

  private viewFiltersResult(value: string, filterType: CurrentFilter): void {
    const products = document.querySelector('.products')!;
    this.setCurrentFilters(value.toLowerCase(), filterType);

    productsData.forEach((item) => {
      if(this.resultFilterProduct.size === 0) {
        if(this.selectedFiltres.get(filterType)?.has(item[filterType].toLowerCase())) {
          this.resultFilterProduct.add(item);
        }
      } else {
        if(this.selectedFiltres.get(filterType)?.has(item[filterType].toLowerCase())) {
          this.resultFilterProduct.add(item);
        } else {
          this.resultFilterProduct.delete(item)
        }
      }
    });
    console.log(this.resultFilterProduct); //I'm using it to show the result while we're thinking about function generateProduct()
  }

  private setCurrentFilters(value: string, filterType: CurrentFilter): void {
    let setFilterItems = this.selectedFiltres.get(filterType)!;
    if(setFilterItems.has(value)) {
      setFilterItems.delete(value);
    } else {
      setFilterItems.add(value);
    }
    this.selectedFiltres.set(filterType, setFilterItems);
  }
}
