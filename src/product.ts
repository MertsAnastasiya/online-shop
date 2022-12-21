"use strict";
import './sass/styles.scss';
import { implementBasket } from "./modules/basket";
import { productsData } from './modules/data';

function determineProduct(currency='€'){
    //Detirmine the places, where to unload the data from productsData

    const categoryName = document.querySelector('.category-name');
    const brandName = document.querySelector('.brand-name');
    const modelName = document.querySelector('.model-name');
    const productName = document.querySelector('.product__name');
    const brand = document.querySelector('.brand');
    const description = document.querySelector('.description');
    const addCartButton = document.querySelector('.add-cart');
    const price = document.querySelector('.price');
    const rating = document.querySelector('.rating-number');


    const urlSearchParams = new URLSearchParams(window.location.search); //gets query parameters
    const params = Object.fromEntries(urlSearchParams.entries()); // represents query parameters as object
    console.log(Object.keys(params));
    console.log(productsData[Number(Object.keys(params))]);
    for(let i = 0; i < productsData.length; i++){
        if(Number(productsData[i]!.id) === Number(Object.keys(params))){
            categoryName!.innerHTML = `${productsData[i]!.category}`;
            brandName!.innerHTML = `${productsData[i]!.brand}`;
            modelName!.innerHTML = `${productsData[i]!.title}`;
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
implementBasket();