import { productsData } from "./data";

class Basket{
    private amount: HTMLParagraphElement; // the number of products put in the basket
    private sum: HTMLParagraphElement; // the money sum of products put in the basket
    private addCartBtns: NodeListOf<Element>; //Array of "Add to cart" buttons
    private amountCounter: number; // to count the amount after every click over add to cart.
    private sumCounter: number; //to add sum of purchase to the basket
    private resetBtn: HTMLButtonElement; //button to reset basket
    private currency: string; //currency symbol, € as default

    constructor(amount: HTMLParagraphElement, sum: HTMLParagraphElement, addCartBtns: NodeListOf<Element>, resetBtn: HTMLButtonElement, currency='€'){
        this.amount = amount;
        this.sum = sum;
        this.addCartBtns = addCartBtns;
        this.amountCounter = 0;
        this.sumCounter = 0;
        this.resetBtn = resetBtn;
        this.currency = currency;
    }

    public countPurchase(){
        if(localStorage.sum){
            this.sum.innerHTML = `${this.currency}${localStorage.sum}`;
            this.sumCounter = Number(localStorage.sum);
        }

        if(localStorage.amount){
            this.amount.innerHTML = `${localStorage.amount}`;
            this.amountCounter = Number(localStorage.amount);
        }

        this.addCartBtns.forEach((el: Element) => {
            el.addEventListener('click', (): void => {
                this.sumCounter += Number(productsData[Number(el.id)-1]?.price);
                this.amountCounter += 1;
                localStorage.setItem('sum', `${this.sumCounter}`);
                localStorage.setItem('amount', `${this.amountCounter}`);
                this.amount.innerHTML = `${localStorage.amount}`;
                this.sum.innerHTML = `${this.currency}${localStorage.sum}`;
            });
        });
    }

    public resetBasket(){
        this.resetBtn.addEventListener('click', (): void =>{
            this.amountCounter = 0;
            this.sumCounter = 0;
            this.amount.innerHTML = `${this.amountCounter}`;
            this.sum.innerHTML = `${this.currency}${this.sumCounter}`;
            localStorage.sum = '0';
            localStorage.amount = '0';
        });
    }

}

export function implementBasket(): void{
    const amount = document.querySelector('.counter') as HTMLParagraphElement;
    const sum = document.querySelector('.total-amount') as HTMLParagraphElement;
    const addCartBtns = document.querySelectorAll('.add-cart');
    const resetButton = document.querySelector('.reset-basket') as HTMLButtonElement;
    const basket = new Basket(amount, sum, addCartBtns, resetButton);
    basket.countPurchase();
    basket.resetBasket();
};

