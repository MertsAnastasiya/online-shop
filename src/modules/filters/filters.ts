import { IProduct } from '../interfaces/product.interface';
import { CurrentFilter } from '../interfaces/customTypes';

export class Filters {

  public generateFilter(data: IProduct[], filterType: CurrentFilter): void {
    const filter = document.querySelector(`.filter_${filterType}`)!;
    const setFilter: Set<string> = this.generateFilterItems(data, filterType);
    setFilter.forEach((item) => filter.appendChild(this.createCheckbox(item)));
  }

  private generateFilterItems(data: IProduct[], filterType: CurrentFilter): Set<string>  {
    const setItems = new Set<string>();
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
