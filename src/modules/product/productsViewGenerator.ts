import { IProduct } from '../interfaces/product.interface';

export class ProductsViewGenerator {
    public generateProduct(arrayData: IProduct[]): void {
        const products = document.querySelector('.products') as HTMLElement;
        products.innerHTML = '';

        arrayData.forEach((data) => {
            const productDiv: Element = document.createElement('div');
            const productLink: Element = document.createElement('a');
            const productImg: Element = document.createElement('img');
            const productSpans: Element = document.createElement('div');
            const nameTitle: Element = document.createElement('span');
            const priceSpan: Element = document.createElement('span');
            const addToCart: Element = document.createElement('button');
            const productImgDiv: Element = document.createElement('div');

            productDiv.classList.add('product');
            productLink.classList.add('link');
            productLink!.setAttribute('href', `product.html?${data.id}`);
            productSpans.className = 'product__spans';
            productImg.setAttribute('src', data.images[0]!);
            productImg.setAttribute('alt', `${data.title}`);
            productImgDiv.appendChild(productImg);
            nameTitle.className = 'product__name';
            priceSpan.className = 'product__price';
            nameTitle.innerHTML = data.title;
            priceSpan.innerHTML = data.price.toString();
            addToCart.className = 'button button_small add-cart';
            addToCart.innerHTML = 'Add to cart';
            addToCart.setAttribute('id', data.id.toString());
            productSpans.appendChild(nameTitle);
            productSpans.appendChild(priceSpan);

            productImg.className = 'product__img';
            productLink.appendChild(productImgDiv);
            productLink.appendChild(productSpans);
            productDiv.appendChild(productLink);
            productDiv.appendChild(addToCart);
            products.appendChild(productDiv);
        });
    }
}
