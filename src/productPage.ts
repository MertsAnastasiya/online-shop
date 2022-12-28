'use strict';
import './sass/styles.scss';
import { productsData } from './modules/data';
import { IProduct } from './modules/interfaces/product.interface';

export class ProductPage {
    private parent: Element;
    private productDataLayout: string;
    private product: IProduct;

    constructor(parent: Element) {
        const params = Object.fromEntries(new URLSearchParams(window.location.search));
        const paramsId = Number(params.id);
        this.product = productsData.filter((data) => data.id === paramsId)[0]!;

        this.parent = parent;
        this.productDataLayout = `
            <div class="route"></div>
            <div class="product-info">
            <div class="product__image">
                <img class="main-image"></img>
                <div class="additional-images__wrapper">
                <img class="additional-image"></img>
                <img class="additional-image"></img>
                <img class="additional-image"></img>
                </div>
            </div>
            <div class="product__description">
                <div>
                <div class="name"></div>
                <div class="brand"></div>
                <div class="description"></div>
                <div class="rating"></div>
                <div class="price"></div>
                </div>
                <div class="buttons__wrapper">
                <button class="button button_add add-cart">Add to Cart</button>
                <button class="button button_buy">Buy Now</button>
                </div>
                <div class="delivery__wrapper">
                <div class="delivery">Free Delivery</div>
                <div class="return">Free 30days returns</div>
                </div>
            </div>
            </div>
        </div>`;
    }

    public drawProductPage() {
        this.parent.innerHTML = this.productDataLayout;
        const route: Element = document.querySelector('.route')!;
        const productName: Element = document.querySelector('.name')!;
        const brand: Element = document.querySelector('.brand')!;
        const description: Element = document.querySelector('.description')!;
        const addCartButton: Element = document.querySelector('.add-cart')!;
        const price: Element = document.querySelector('.price')!;
        const rating: Element = document.querySelector('.rating')!;
        const mainImg = document.querySelector('.main-image')! as HTMLImageElement;
        const addImg = document.querySelectorAll('.additional-image')! as NodeListOf<HTMLImageElement>;
    }
    //     const routeText: string = `Store / ${this.product.category.charAt(0).toUpperCase()}${product.category.slice(1)} / ${product.brand} / ${product.title}`;
    //     route.innerHTML = routeText;
    //     productName.innerHTML = product.title;
    //     brand!.innerHTML = product.brand;
    //     description!.innerHTML = product.description;
    //     addCartButton.setAttribute('id', product.id.toString());
    //     price!.innerHTML = `€${product.price}`;
    //     rating!.innerHTML = `Rating: ${product.rating}`;
    //     if (product.images[0]) {
    //         mainImg.src = product.images[0]!;
    //     }
    //     let i = 0;
    //     addImg.forEach((item) => {
    //         if (product.images[i]) {
    //             item.src = product.images[i]!;
    //             item.addEventListener('click', () => {
    //                 mainImg.src = item.src;
    //             });
    //         }
    //         i++;
    //     });
    // }
}
// console.log(window.location);


//         const route: Element = document.querySelector('.route')!;
//         const productName: Element = document.querySelector('.name')!;
//         const brand: Element = document.querySelector('.brand')!;
//         const description: Element = document.querySelector('.description')!;
//         const addCartButton: Element = document.querySelector('.add-cart')!;
//         const price: Element = document.querySelector('.price')!;
//         const rating: Element = document.querySelector('.rating')!;
//
//         const mainImg = document.querySelector('.main-image')! as HTMLImageElement;
//         const addImg = document.querySelectorAll('.additional-image')! as NodeListOf<HTMLImageElement>;
//
//         const urlSearchParams = new URLSearchParams(window.location.search); //gets query parameters
//         const params = Object.fromEntries(urlSearchParams.entries()); // represents query parameters as object
//         const paramsId = Number(Object.keys(params));
//
//         if(productsData.filter((item) => item.id === paramsId)) {
//             const data: IProduct = productsData.filter((item) => item.id === paramsId)[0]!;
//             const routeText: string = `Store / ${data.category.charAt(0).toUpperCase()}${data.category.slice(1)} / ${data.brand} / ${data.title}`;
//             route.innerHTML = routeText;
//             productName.innerHTML = data.title;
//             brand!.innerHTML = data.brand;
//             description!.innerHTML = data.description;
//             addCartButton.setAttribute('id', data.id.toString());
//             price!.innerHTML = `€${data.price}`;
//             rating!.innerHTML = `Rating: ${data.rating}`;
//             if(data.images[0]) {
//                 mainImg.src = data.images[0]!;
//             }
//             let i = 0;
//             addImg.forEach((item) => {
//                 if(data.images[i]) {
//                     item.src = data.images[i]!;
//                     item.addEventListener('click', () => {
//                         mainImg.src = item.src;
//                     });
//                 }
//                 i++;
//             });
//         }
//     }

// }

// drawProductPage()
