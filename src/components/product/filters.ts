import { productsData } from "../data";
import { IProduct } from "../interfaces/product.interface";
import { Product, productProperty } from "./product";

class Filters {

  private static filterByProperty(value: string, data: Product[], filter: productProperty): IProduct[] {
    return data.filter( (item) => item[filter] === value);
  }

  public static filterByCategory(category: string): IProduct[] {
    let property = 'category' as productProperty;
    return this.filterByProperty(category, productsData, property);
  }

  public static filterByBrand(brand: string): IProduct[] {
    let property = 'brand' as productProperty;
    return this.filterByProperty(brand, productsData, property);
  }
}

console.log(Filters.filterByBrand('apple'));
console.log(Filters.filterByBrand('smartphones'));
