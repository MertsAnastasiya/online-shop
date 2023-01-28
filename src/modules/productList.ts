import { OnButtonCartClick, OnProductClick} from './interfaces/customTypes';
import { IProduct } from './interfaces/product.interface';

export class ProductList {
    private parent: Element;
    private onButtonCartClick: OnButtonCartClick;
    private onProductClick: OnProductClick;
    private checkButtonStatus: (id: number) => boolean;

    constructor(parent: Element, onButtonCartClick: OnButtonCartClick, onProductClick: OnProductClick, checkButtonStatus: (id: number) => boolean) {
        this.parent = parent;
        this.onButtonCartClick = onButtonCartClick;
        this.onProductClick = onProductClick;
        this.checkButtonStatus = checkButtonStatus;
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
            priceSpan.innerHTML = product.price.toString();
            buttonAddToCart.className = 'button button_small';
            if (this.checkButtonStatus(product.id)) {
                buttonAddToCart.innerHTML = 'Remove from cart';
                buttonAddToCart.classList.add('remove-from-cart');
            } else {
                buttonAddToCart.innerHTML = 'Add to cart';
                buttonAddToCart.classList.add('add-to-cart');
            }

            buttonAddToCart.addEventListener('click', (event) => {
                event.stopPropagation();
                this.onButtonCartClick(event, product.id);
            });
            productDiv.addEventListener('click', () => this.onProductClick(product.id));
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
