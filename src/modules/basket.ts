import { productsData } from './data';

class Basket {
    private amount: Element; // the number of products put in the basket
    private sum: Element; // the money sum of products put in the basket
    private addCartBtns: NodeListOf<Element>; //Array of "Add to cart" buttons
    private amountCounter: number; // to count the amount after every click over add to cart.
    private sumCounter: number; //to add sum of purchase to the basket
    private resetBtn: Element; //button to reset basket
    private currency: string; //currency symbol, € as default

    constructor(amount: Element, sum: Element, addCartBtns: NodeListOf<Element>, resetBtn: Element, currency = '€'){
        this.amount = amount;
        this.sum = sum;
        this.addCartBtns = addCartBtns;
        this.amountCounter = 0;
        this.sumCounter = 0;
        this.resetBtn = resetBtn;
        this.currency = currency;
    }

    public countPurchase(){
        if(localStorage.getItem('sum')){
            this.sum.innerHTML = `${this.currency}${localStorage.getItem('sum')}`;
            this.sumCounter = Number(localStorage.getItem('sum'));
        }

        if(localStorage.getItem('amount')){
            this.amount.innerHTML = `${localStorage.getItem('amount')}`;
            this.amountCounter = Number(localStorage.getItem('amount'));
        }

        this.addCartBtns.forEach((el: Element) => {
            el.addEventListener('click', (): void => {
                if (el.classList.contains('add-cart')) {
                    el.classList.remove('add-cart');
                    el.classList.add('remove-cart');
                    el.innerHTML = 'Remove from cart';
                    this.sumCounter += Number(
                        productsData[Number(el.id) - 1]?.price
                    );
                    this.amountCounter += 1;
                } else {
                    el.innerHTML = 'Add to cart';
                    el.classList.add('add-cart');
                    el.classList.remove('remove-cart');
                    this.sumCounter -= Number(productsData[Number(el.id) - 1]?.price); ///????
                    this.amountCounter -= 1;
                }
                localStorage.setItem('sum', `${this.sumCounter}`);
                localStorage.setItem('amount', `${this.amountCounter}`);
                this.amount.innerHTML = `${localStorage.getItem('amount')}`;
                this.sum.innerHTML = `${this.currency}${localStorage.getItem('sum')}`;
            });
        });
    }

    public resetBasket(){
        this.resetBtn.addEventListener('click', (): void =>{
            this.amountCounter = 0;
            this.sumCounter = 0;
            this.amount.innerHTML = `${this.amountCounter}`;
            this.sum.innerHTML = `${this.currency}${this.sumCounter}`;
            localStorage.setItem('sum', '0');
            localStorage.setItem('amount', '0');
        });
    }
}

export function implementBasket(): void{
    const amount: Element = document.querySelector('.counter')!;
    const sum: Element = document.querySelector('.total-amount')!;
    const addCartBtns: NodeListOf<Element> = document.querySelectorAll('.add-cart')!;
    const resetButton: Element = document.querySelector('.reset-basket')!;
    const basket = new Basket(amount, sum, addCartBtns, resetButton);
    basket.countPurchase();
    basket.resetBasket();
};
