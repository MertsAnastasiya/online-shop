import { OnClickCart } from './interfaces/customTypes';


export class Cart {
    private readonly parent: Element;
    private readonly basketWrapper: Element;
    private readonly onClickCart: OnClickCart;

    constructor(parent: Element, onClickCart: OnClickCart) {
        this.parent = parent;
        this.onClickCart = onClickCart;

        this.basketWrapper = document.createElement('div');
        this.basketWrapper.classList.add('basket-wrapper');
        this.basketWrapper.innerHTML =
            `
            <p class="total-amount"></p>
            <div class="basket-background">
                <img
                    src="assets/img/solution-cart 1.png"
                    alt="basket"
                    class="basket"
                />
                <p class="counter"></p>
            </div>`;
    }

    public drawCart(): void {
        this.basketWrapper.addEventListener('click', () => {
            this.onClickCart();
        });
        this.parent.appendChild(this.basketWrapper);
    }

    public setCurrentValues(currentSum: string, currentCount: string): void {
        const cartSum: Element = document.querySelector('.total-amount')!;
        cartSum.textContent = `€${currentSum}`;
        const cartCount: Element = document.querySelector('.counter')!;
        cartCount.textContent = currentCount;
    }
}
