import { IProduct } from '../interfaces/product.interface';
import { productProperty } from '../interfaces/type';

export class Filters {

  public generateFilter(data: IProduct[],filterType: productProperty): void {
    const filter = document.querySelector(`.filter_${filterType}`)!;
    const setFilter: Set<unknown> = this.generateFilterItems(data, filterType);
    setFilter.forEach((item) => filter.appendChild(this.createCheckbox(item as string)));
  }

  private generateFilterItems(data: IProduct[], filterType: productProperty): Set<unknown>  {
    const setItems = new Set<unknown>();
    data.forEach((item) => setItems.add(item[filterType]));
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
    const label = document.createElement('label');
    label.classList.add('label');
    label.htmlFor = checkbox.id;
    label.textContent = value;

    filterItem.appendChild(checkbox);
    filterItem.appendChild(label);

    return filterItem;
  }
}
