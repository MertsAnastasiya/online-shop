/* eslint-disable @typescript-eslint/no-unused-vars */
import './sass/header.scss';
import './sass/index-main.scss';
import './sass/footer.scss';
import { dataBase } from './modules/database';
import './modules/sliders';
import { productsData } from './components/data';
import { ClassLikeDeclarationBase } from 'typescript';

function generateProduct(num: number): void{
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


function uploadCategories(value: string, selector: string): void{
    const categoriesSet = new Set();
    const categoriesArray: string[]= [];
    const cat: string = value;
    const htmlSelector = selector;


    for(let i = 0; i < dataBase.products.length - 1; i++){
        cat === 'category'? categoriesSet.add(dataBase.products[i]?.category) : categoriesSet.add(dataBase.products[i]?.brand);
    }

    for(const value of categoriesSet.values()){
        categoriesArray.push(value as string);
    }

    for(let i = 0; i < categoriesArray.length - 1; i++){
        const categories = document.querySelector(htmlSelector) as HTMLDivElement;
        const paragraph = document.createElement('p') as HTMLParagraphElement;
        const input = document.createElement('input') as HTMLInputElement;
        input.setAttribute('name', `option${i+1}`);
        input.setAttribute('type', 'checkbox');
        input.setAttribute('value', String(i+1));
        paragraph.innerHTML = `<input class="${cat}" type="checkbox" name="${categoriesArray[i]}" value="${i}">${categoriesArray[i]}`;
        categories.appendChild(paragraph);
    }

}

function start(): void{
    uploadCategories('category', '.categories');
    uploadCategories('brand', '.brands');

    for(let i = 0; i < dataBase.products.length - 1; i++){
        generateProduct(i);
    };
}

start();