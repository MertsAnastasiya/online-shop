export class Cart {
    private static instance: Cart;
    public resetBtn: Element;
    public headerAmount: Element;
    public headerSum: Element;

    private constructor() {
        this.resetBtn = document.querySelector('.reset-basket')!;
        this.headerAmount = document.querySelector('.counter')!;
        this.headerSum = document.querySelector('.total-amount')!;
    }

    public static getInstance(): Cart {
        if (!Cart.instance) {
            Cart.instance = new Cart();
        }
        return Cart.instance;
    }

    public getSum(): string {
        if(localStorage.getItem('sum')) {
            return localStorage.getItem('sum')!;
        } else {
            return '0';
        }
    }

    public getAmount(): string {
        if(localStorage.getItem('amount')) {
            return localStorage.getItem('amount')!;
        } else {
            return '0';
        }
    }

    public setSum(sum: string): void {
       localStorage.setItem('sum', sum);
    }

    public setAmount(amount: string): void {
        localStorage.setItem('amount', amount);
    }

    public resetCart() {
        this.resetBtn.addEventListener('click', (): void => {
            this.headerAmount.innerHTML = '0';
            this.headerSum.innerHTML = '€0';
            this.setAmount('0');
            this.setSum('0');
        });
    }
    public updateCart(event: Event, price: number) {
        const target = event.target! as Element;
        let sum: number = Number(this.getSum());
        let amount: number = Number(this.getAmount());
        if(target.classList.contains('add-cart')) {
            target.classList.remove('add-cart');
            target.classList.add('remove-cart');
            target.innerHTML = 'Remove from cart';
            sum += price;
            this.setSum(sum.toString());
            amount += 1;
            this.setAmount(amount.toString());
        } else {
            target.classList.add('add-cart');
            target.classList.remove('remove-cart');
            target.innerHTML = 'Add to cart';
            sum -= price;
            this.setSum(sum.toString());
            amount -= 1;
            this.setAmount(amount.toString());
        }

        this.headerAmount.innerHTML = this.getAmount();
        this.headerSum.innerHTML = this.getSum();
    }
}
