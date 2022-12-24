import { productsData } from '../data';
import { IProduct } from '../interfaces/product.interface';

export class ProductViewGenerator {
    public generateProduct(arrayData: IProduct[]): void {
        const products = document.querySelector('.products') as HTMLElement;
        products.innerHTML = '';

        arrayData.forEach((data) => {
            const productDiv: HTMLDivElement = document.createElement('div');
            const productImg: HTMLImageElement = document.createElement('img');
            const productSpans: HTMLDivElement = document.createElement('div');
            const nameTitle: HTMLSpanElement = document.createElement('a');
            const priceSpan: HTMLSpanElement = document.createElement('span');
            const addToCart: HTMLButtonElement = document.createElement('button');
            const productImgDiv: HTMLDivElement = document.createElement('div');

            productDiv.className = 'product';
            productSpans.className = 'product__spans';
            productImg.setAttribute('src', data.images[0]!);
            productImg.setAttribute('alt', 'product');
            productImgDiv.appendChild(productImg);
            nameTitle.className = 'product__name';
            priceSpan.className = 'product__price';
            nameTitle.innerHTML = data.title;
            nameTitle!.setAttribute('href', `product.html?${data.id}`);
            priceSpan.innerHTML = data.price.toString();
            addToCart.className = 'button button_small add-cart';
            addToCart.innerHTML = 'Add to cart';
            addToCart.setAttribute('id', data.id.toString());
            productSpans.appendChild(nameTitle);
            productSpans.appendChild(priceSpan);

            productImg.className = 'product__img';
            productDiv.appendChild(productImgDiv);
            productDiv.appendChild(productSpans);
            productDiv.appendChild(addToCart);
            products.appendChild(productDiv);
        });
    }
}
