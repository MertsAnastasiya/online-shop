"use strict";
import './sass/styles.scss';
import { productsData } from './modules/data';

function determineProduct(currency='€'){

    const route = document.querySelector('.route');
    const productName = document.querySelector('.product__name');
    const brand = document.querySelector('.brand');
    const description = document.querySelector('.description');
    const addCartButton = document.querySelector('.add-cart');
    const price = document.querySelector('.price');
    const rating = document.querySelector('.rating-number');


    const urlSearchParams = new URLSearchParams(window.location.search); //gets query parameters
    const params = Object.fromEntries(urlSearchParams.entries()); // represents query parameters as object
    for(let i = 0; i < productsData.length; i++){
        if(Number(productsData[i]!.id) === Number(Object.keys(params))){
            const routeText = `Store / ${productsData[i]!.category} / ${productsData[i]!.brand} / ${productsData[i]!.title}`;
            route!.innerHTML = `${routeText}`;
            productName!.innerHTML = `${productsData[i]!.title}`;
            brand!.innerHTML = `${productsData[i]!.brand}`;
            description!.innerHTML = `${productsData[i]!.description}`;
            addCartButton?.setAttribute('id', `${productsData[i]!.id}`);
            price!.innerHTML = `${productsData[i]!.price}${currency}`;
            rating!.innerHTML = `Rating: ${productsData[i]!.rating}`;
            break;
        }
    }
}

determineProduct();
