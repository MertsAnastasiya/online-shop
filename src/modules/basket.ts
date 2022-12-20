import { productsData } from "./data";

class Basket{
    private amount: HTMLParagraphElement; // the number of products put in the basket
    private sum: HTMLParagraphElement; // the money sum of products put in the basket
    private addCartBtns: NodeListOf<Element>; //Array of "Add to cart" buttons
    private amountCounter: number; // to count the amount after every click over add to cart.
    private sumCounter: number; //to add sum of purchase to the basket
    private currency: string; //currency symbol, € as default

    constructor(amount: HTMLParagraphElement, sum: HTMLParagraphElement, addCartBtns: NodeListOf<Element>, amountCounter=0, sumCounter=0, currency='€'){
        this.amount = amount;
        this.sum = sum;
        this.addCartBtns = addCartBtns;
        this.amountCounter = amountCounter;
        this.sumCounter = sumCounter;
        this.currency = currency;
    }

    public countPurchase(){
        this.addCartBtns.forEach((el: Element) => {
            el.addEventListener('click', () => {
                this.sumCounter += Number(productsData[Number(el.id)-1]?.price);
                this.amountCounter += 1;
                this.amount.innerHTML = `${this.amountCounter}`;
                this.sum.innerHTML = `${this.currency}${this.sumCounter}`;
            });
        });
    }

}

export function implementBasket(): void{
    const amount = document.querySelector('.counter') as HTMLParagraphElement;
    const sum = document.querySelector('.total-amount') as HTMLParagraphElement;
    const addCartBtns = document.querySelectorAll('.add-cart');
    const basket = new Basket(amount, sum, addCartBtns);
    basket.countPurchase();
};

