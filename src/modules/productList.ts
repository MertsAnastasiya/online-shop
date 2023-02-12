import { OnButtonCartClick, OnProductClick } from './interfaces/customTypes';
import { IProduct } from './interfaces/product.interface';

export class ProductList {
    private readonly parent: Element;
    private readonly onButtonCartClick: OnButtonCartClick;
    private readonly onProductClick: OnProductClick;
    private readonly checkButtonStatus: (id: number) => boolean;

    constructor(
        parent: Element,
        onButtonCartClick: OnButtonCartClick,
        onProductClick: OnProductClick,
        checkButtonStatus: (id: number) => boolean
    ) {
        this.parent = parent;
        this.onButtonCartClick = onButtonCartClick;
        this.onProductClick = onProductClick;
        this.checkButtonStatus = checkButtonStatus;
    }

    public drawProductList(productsList: IProduct[]): void {
        this.parent.innerHTML = '';

        productsList.forEach((product) => {
            const productWrapper: HTMLDivElement =
                document.createElement('div');
            productWrapper.classList.add('product');
            productWrapper.addEventListener('click', () =>
                this.onProductClick(product.id)
            );

            productWrapper.appendChild(this.createProductImage(product.images));
            productWrapper.appendChild(
                this.createProductTitle(product.title, product.price)
            );
            productWrapper.appendChild(this.createButtonAddToCart(product.id));

            this.parent.appendChild(productWrapper);
        });
    }

    private createProductImage(images: string[]): Element {
        const productImgDiv: HTMLDivElement = document.createElement('div');
        const productImg: HTMLImageElement = document.createElement('img');
        productImg.setAttribute('src', images[0]!);
        productImg.setAttribute('alt', 'product');
        productImg.classList.add('product__img');
        productImgDiv.appendChild(productImg);

        return productImgDiv;
    }

    private createProductTitle(title: string, price: number): Element {
        const productSpans: HTMLDivElement = document.createElement('div');
        const nameTitle: HTMLSpanElement = document.createElement('span');
        const priceSpan: HTMLSpanElement = document.createElement('span');

        productSpans.classList.add('product__spans');
        nameTitle.classList.add('product__name');
        priceSpan.classList.add('product__price');
        nameTitle.textContent = title;
        priceSpan.textContent = `€‎${price}`;

        productSpans.appendChild(nameTitle);
        productSpans.appendChild(priceSpan);

        return productSpans;
    }

    private createButtonAddToCart(id: number): Element {
        const buttonAddToCart: HTMLButtonElement =
            document.createElement('button');
        buttonAddToCart.classList.add('button');
        buttonAddToCart.classList.add('button_small');
        if (this.checkButtonStatus(id)) {
            buttonAddToCart.innerHTML = 'Remove from cart';
            buttonAddToCart.classList.add('remove-from-cart');
        } else {
            buttonAddToCart.innerHTML = 'Add to cart';
            buttonAddToCart.classList.add('add-to-cart');
        }

        buttonAddToCart.addEventListener('click', (event) => {
            event.stopPropagation();
            this.onButtonCartClick(event, id);
        });
        return buttonAddToCart;
    }
}
