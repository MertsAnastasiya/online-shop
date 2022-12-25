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
}
