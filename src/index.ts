import './sass/styles.scss';
import "./modules/sliders";
import { productsData } from './modules/data';
import { Filters } from './modules/filters/filters';
import { implementBasket } from "./modules/basket";
import { ProductViewGenerator } from './modules/product/product';

function start(): void {
    ProductViewGenerator.generateProduct(productsData);

    const filters: Filters = new Filters();
    filters.generateFilter(productsData, 'category');
    filters.generateFilter(productsData, 'brand');

}

start();

//I'd like to run this function from separate module (basket.ts), but if I do it, this function runs before
//the products are uploaded (start function), so I'm not able to capture all the "add to cart" buttons,
//that are generated by "start function". Probably further refactor will be done. I just put it here for now,
//to avoid merge conflicts on this stage of development.

implementBasket();