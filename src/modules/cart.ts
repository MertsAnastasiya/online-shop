export class Cart {
    private parent: Element;
    private basketWrapper: Element;

    constructor(parent: Element) {
        this.parent = parent;
        this.basketWrapper = document.createElement('div');
        this.basketWrapper.classList.add('basket-wrapper');
        this.basketWrapper.innerHTML =
            `<p class="total-amount"></p>
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
        this.parent.appendChild(this.basketWrapper);
    }

    public setCurrentValues(currentSum: string, currentCount: string): void {
        const cartSum: Element = document.querySelector('.total-amount')!;
        cartSum.textContent = `€${currentSum}`;
        const cartCount: Element = document.querySelector('.counter')!;
        cartCount.textContent = currentCount;
    }
}
