import { IProduct } from "../interfaces/product.interface";
import { productsData } from '../data';

export type productProperty = keyof Product;

export class Product implements IProduct {
  public id: number;
  public title: string;
  // public brand: string;
  // public description: string;
  // public price: number;
  // public discountPercentage: number;
  // public rating: number;
  // public stock: number;
  public category: string;
  // public thumbnail: string;
  // public images: string[];
  // public setCategory = new Set<string>();
  constructor(id: number, title: string, category: string) {
    this.id = id;
    this.title = title;
    this.category = category;
  }


}
