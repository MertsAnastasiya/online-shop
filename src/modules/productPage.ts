'use strict';
import { productsData } from './data';
import {
    OnButtonCartClick,
    OnButtonClick,
    PageButtons,
} from './interfaces/customTypes';
import { IProduct } from './interfaces/product.interface';
import { defaultImage, requiresNonNullOrDefault } from './utils';

export class ProductPage {
    private readonly parent: Element;
    private readonly productDataLayout: string;
    private readonly product: IProduct | undefined;
    private readonly onButtonClick: OnButtonClick;
    private readonly onProductSelected: OnButtonCartClick;
    private readonly imageCount = 3;

    constructor(
        parent: Element,
        id: number,
        onProductSelected: OnButtonCartClick,
        onButtonClick: OnButtonClick
    ) {
        this.parent = parent;
        this.onButtonClick = onButtonClick;
        this.onProductSelected = onProductSelected;

        this.product = productsData.filter((data) => data.id === id)[0];

        this.productDataLayout = `
            <div class="route"></div>
            <div class="product-info">
                <div class="product__image">
                    <img class="main-image"></img>
                    <div class="additional-images__wrapper">
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
        </div>
        <div class="disabled-area hidden"></div>`;
    }

    public drawProductPage(selectedArray: number[]): void {
        this.parent.innerHTML =
            this.product !== undefined
                ? this.productDataLayout
                : `<div class="not-found">Not found items</div>`;

        if (this.product !== undefined) {
            const route: Element = document.querySelector('.route')!;
            const productName: Element = document.querySelector('.name')!;
            const brand: Element = document.querySelector('.brand')!;
            const description: Element =
                document.querySelector('.description')!;
            const buttonAddToCart: Element =
                document.querySelector('.add-cart')!;
            let isAddedToCart: boolean = Boolean(
                selectedArray.filter((item) => item === this.product!.id)[0]
            );
            if (isAddedToCart) {
                buttonAddToCart.innerHTML = 'Remove from cart';
                buttonAddToCart.classList.add('remove-from-cart');
                isAddedToCart = false;
            } else {
                buttonAddToCart.innerHTML = 'Add to cart';
                buttonAddToCart.classList.add('add-to-cart');
                isAddedToCart = true;
            }
            const buyButton: HTMLButtonElement =
                document.querySelector<HTMLButtonElement>('.button_buy')!;
            const price: Element = document.querySelector('.price')!;
            const rating: Element = document.querySelector('.rating')!;
            const mainImg: HTMLImageElement =
                document.querySelector<HTMLImageElement>('.main-image')!;
            const addImgWrapper: Element = document.querySelector(
                '.additional-images__wrapper'
            )!;

            const routeText: string = `Store / ${this.product.category} / ${this.product.brand} / ${this.product.title}`;
            route.textContent = routeText;
            productName.innerHTML = this.product.title;
            brand!.textContent = this.product.brand;
            description!.textContent = this.product.description;
            buttonAddToCart.setAttribute('id', this.product.id.toString());
            price!.textContent = `€${this.product.price}`;
            rating!.textContent = `Rating: ${this.product.rating}`;
            mainImg.src = requiresNonNullOrDefault(
                this.product.images[0],
                defaultImage
            );

            let i: number = 0;
            while (i < this.imageCount) {
                if (this.product.images[i]) {
                    const addImg: HTMLImageElement =
                        document.createElement('img');
                    addImg.classList.add('additional-image');
                    addImg.src = this.product.images[i]!;
                    addImg.addEventListener('click', () => {
                        mainImg.src = addImg.src;
                    });
                    addImgWrapper.appendChild(addImg);
                }
                i++;
            }
            buttonAddToCart.addEventListener('click', (event) =>
                this.onProductSelected(event, this.product!.id)
            );
            buyButton.addEventListener('click', () =>
                this.onButtonClick(PageButtons.Buy)
            );
        }
    }
}
