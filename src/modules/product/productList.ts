import { OnButtonCartClick, OnProductClick } from '../interfaces/customTypes';
import { IProduct } from '../interfaces/product.interface';

export class ProductList {
    private parent: Element;
    private onButtonClick: OnButtonCartClick;
    private onProductClick: OnProductClick;

    constructor(parent: Element, onButtonClick: OnButtonCartClick, onProductClick: OnProductClick) {
        this.parent = parent;
        this.onButtonClick = onButtonClick;
        this.onProductClick = onProductClick;
    }

    public drawProductList(productsList: IProduct[]): void {
        this.parent.innerHTML = '';

        productsList.forEach((product) => {
            const productDiv: HTMLDivElement = document.createElement('div');
            const productImg: HTMLImageElement = document.createElement('img');
            const productSpans: HTMLDivElement = document.createElement('div');
            const nameTitle: HTMLSpanElement = document.createElement('span');
            const priceSpan: HTMLSpanElement = document.createElement('span');
            const buttonAddToCart: HTMLButtonElement = document.createElement('button');
            const productImgDiv: HTMLDivElement = document.createElement('div');

            productDiv.className = 'product';
            productSpans.className = 'product__spans';
            productImg.setAttribute('src', product.images[0]!);
            productImg.setAttribute('alt', 'product');
            productImgDiv.appendChild(productImg);
            nameTitle.className = 'product__name';
            priceSpan.className = 'product__price';
            nameTitle.innerHTML = product.title;
            productDiv.addEventListener('click', () => this.onProductClick(product.id))
            priceSpan.innerHTML = product.price.toString();
            buttonAddToCart.className = 'button button_small add-to-cart';
            buttonAddToCart.innerHTML = 'Add to cart';
            buttonAddToCart.addEventListener('click', (event) => {
                event.stopPropagation();
                const target = event.target as Element;
                target.classList.toggle('add-to-cart');
                target.classList.toggle('remove-from-cart');
                let isAdded: boolean;
                if (target.classList.contains('remove-from-cart')) {
                   target.innerHTML = 'Remove from cart';
                   isAdded = true;
                 } else {
                     target.innerHTML = 'Add to cart';
                     isAdded = false;
                 }

                this.onButtonClick(product.id, isAdded);
            });
            productSpans.appendChild(nameTitle);
            productSpans.appendChild(priceSpan);

            productImg.className = 'product__img';
            productDiv.appendChild(productImgDiv);
            productDiv.appendChild(productSpans);
            productDiv.appendChild(buttonAddToCart);

            this.parent.appendChild(productDiv);
        });
    }
}
