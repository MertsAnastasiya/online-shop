import './sass/styles.scss';
import "./modules/sliders";
import { productsData } from './modules/data';
import { IProduct } from './modules/interfaces/product.interface';
import { Filters } from './modules/filters/filters';

function generateProduct(num: number, currency: string): void{
    const products = document.querySelector(".products") as HTMLElement;
    const productDiv: HTMLDivElement = document.createElement('div');
    const productImg: HTMLImageElement = document.createElement('img');
    const productSpans: HTMLDivElement = document.createElement('div');
    const nameSpan: HTMLSpanElement = document.createElement('span');
    const priceSpan: HTMLSpanElement = document.createElement('span');
    const addToCart: HTMLButtonElement = document.createElement('button');
    const productImgDiv: HTMLDivElement = document.createElement('div');


    productDiv.className = "product";
    productSpans.className = "product__spans";
    productImg.setAttribute('src', productsData[num]!.images[0] as keyof IProduct);
    productImg.setAttribute('alt', "product");
    productImgDiv.appendChild(productImg);
    nameSpan.className = "product__name";
    priceSpan.className = "product__price";
    nameSpan.innerHTML = `${productsData[num]?.title}`;
    priceSpan.innerHTML = `${currency}${productsData[num]?.price}`;
    addToCart.className = "button button_small add-cart";
    addToCart.innerHTML = "Add to cart";

    productSpans.appendChild(nameSpan);
    productSpans.appendChild(priceSpan);

    productImg.className = "product__img";
    productDiv.appendChild(productImgDiv);
    productDiv.appendChild(productSpans);
    productDiv.appendChild(addToCart);
    products.appendChild(productDiv);
}

function start(): void{
    for(let i = 0; i < productsData.length; i++){
        generateProduct(i, '€');
    };

    let filters: Filters = new Filters();
    filters.generateFilter(productsData, 'category');
    filters.generateFilter(productsData, 'brand');

}

start();
