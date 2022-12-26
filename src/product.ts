"use strict";
import './sass/styles.scss';
import { productsData } from './modules/data';
import { IProduct } from './modules/interfaces/product.interface';

function drawProductPage() {
    const route: Element = document.querySelector('.route')!;
    const productName: Element = document.querySelector('.name')!;
    const brand: Element = document.querySelector('.brand')!;
    const description: Element = document.querySelector('.description')!;
    const addCartButton: Element = document.querySelector('.add-cart')!;
    const price: Element = document.querySelector('.price')!;
    const rating: Element = document.querySelector('.rating')!;
    const buyButton: Element = document.querySelector('.button_buy')!;
    const closeModal: Element = document.querySelector('.modal__close')!;
    const modalWindow: Element = document.querySelector('.modal-window')!;
    const modalBackground: Element = document.querySelector('.modal-background')!;

    const mainImg = document.querySelector('.main-image')! as HTMLImageElement;
    const addImg = document.querySelectorAll('.additional-image')! as NodeListOf<HTMLImageElement>;

    const urlSearchParams = new URLSearchParams(window.location.search); //gets query parameters
    const params = Object.fromEntries(urlSearchParams.entries()); // represents query parameters as object
    const paramsId = Number(Object.keys(params));

    if(productsData.filter((item) => item.id === paramsId)) {
        const data: IProduct = productsData.filter((item) => item.id === paramsId)[0]!;
        const routeText: string = `Store / ${data.category.charAt(0).toUpperCase()}${data.category.slice(1)} / ${data.brand} / ${data.title}`;
        route.innerHTML = routeText;
        productName.innerHTML = data.title;
        brand!.innerHTML = data.brand;
        description!.innerHTML = data.description;
        addCartButton.setAttribute('id', data.id.toString());
        buyButton.addEventListener('click', () => {
            modalWindow.classList.remove('display-none');
            modalBackground.classList.remove('display-none');
        });
        closeModal.addEventListener('click', () => {
            modalWindow.classList.add('display-none');
            modalBackground.classList.add('display-none');
        });
        price!.innerHTML = `€${data.price}`;
        rating!.innerHTML = `Rating: ${data.rating}`;
        if(data.images[0]) {
            mainImg.src = data.images[0]!;
        }
        let i = 0;
        addImg.forEach((item) => {
            if(data.images[i]) {
                item.src = data.images[i]!;
                item.addEventListener('click', () => {
                    mainImg.src = item.src;
                });
            }
            i++;
        });
    }
}

drawProductPage();
