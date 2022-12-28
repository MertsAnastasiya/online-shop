import { IProduct } from '../interfaces/product.interface';

export class ProductList {
    private parent: Element;

    constructor(parent: Element) {
        this.parent = parent;
    }

    public drawProductList(productsList: IProduct[]): void {
        this.parent.innerHTML = '';

        productsList.forEach((product) => {
            const productDiv: HTMLDivElement = document.createElement('div');
            const productImg: HTMLImageElement = document.createElement('img');
            const productSpans: HTMLDivElement = document.createElement('div');
            const nameTitle: HTMLSpanElement = document.createElement('a');
            const priceSpan: HTMLSpanElement = document.createElement('span');
            const addToCart: HTMLButtonElement = document.createElement('button');
            const productImgDiv: HTMLDivElement = document.createElement('div');

            productDiv.className = 'product';
            productSpans.className = 'product__spans';
            productImg.setAttribute('src', product.images[0]!);
            productImg.setAttribute('alt', 'product');
            productImgDiv.appendChild(productImg);
            nameTitle.className = 'product__name';
            priceSpan.className = 'product__price';
            nameTitle.innerHTML = product.title;
            nameTitle!.setAttribute('href', `product.html?${product.id}`);
            priceSpan.innerHTML = product.price.toString();
            addToCart.className = 'button button_small add-to-cart';
            addToCart.innerHTML = 'Add to cart';
            addToCart.setAttribute('id', product.id.toString());
            productSpans.appendChild(nameTitle);
            productSpans.appendChild(priceSpan);

            productImg.className = 'product__img';
            productDiv.appendChild(productImgDiv);
            productDiv.appendChild(productSpans);
            productDiv.appendChild(addToCart);

            this.parent.appendChild(productDiv);
        });
    }
}
