/* eslint-disable @typescript-eslint/no-unused-vars */
import './sass/header.scss';
import './sass/index-main.scss';
import './sass/footer.scss';
import { dataBase } from './modules/database';
console.log(dataBase.products[0]?.images[0]);


function fillProducts(num: number){
    const products = document.querySelector(".products") as HTMLElement;
    const productDiv: HTMLElement = document.createElement('div');
    const productImg: HTMLElement = document.createElement('img');
    const productSpans: HTMLElement = document.createElement('div');
    const nameSpan: HTMLElement = document.createElement('span');
    const priceSpan: HTMLElement = document.createElement('span');
    const addToCart: HTMLElement = document.createElement('button');
    const productImgDiv: HTMLElement = document.createElement('div');


    productDiv.className = "product";
    productSpans.className = "product-spans";
    productImg.setAttribute('src', dataBase.products[num]?.images[0] as string);
    productImg.setAttribute('alt', "product");
    productImgDiv.appendChild(productImg);
    nameSpan.className = "name-span";
    priceSpan.className = "price-span";
    nameSpan.innerHTML = `${dataBase.products[num]?.title}`;
    priceSpan.innerHTML = `€${dataBase.products[num]?.price}.00`;
    addToCart.className = "add-cart";
    addToCart.innerHTML = "Add to cart";

    productSpans.appendChild(nameSpan);
    productSpans.appendChild(priceSpan);

    productImg.className = "product-img";
    productDiv.appendChild(productImgDiv);
    productDiv.appendChild(productSpans);
    productDiv.appendChild(addToCart);
    products.appendChild(productDiv);
}

for(let i = 0; i < dataBase.products.length - 1; i++){
    fillProducts(i);
}