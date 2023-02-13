import { OnButtonClick, PageButtons } from './interfaces/customTypes';

export class PaymentForm {
    private readonly modalWindow: Element;
    private readonly parent: Element;
    private readonly onClickButton: OnButtonClick;
    private readonly maxLengthCardNumber: number = 19;
    private readonly maxLengthCvv: number = 3;
    private readonly maxLengthDate: number = 5;

    constructor(parent: Element, onClickButton: OnButtonClick) {
        this.onClickButton = onClickButton;
        this.parent = parent;
        this.modalWindow = document.createElement('div');
        this.modalWindow.classList.add('modal-window');
        this.modalWindow.innerHTML = `
        <p class="modal__close">&times;</p>
        <p class="modal__text">Make a payment</p>
        <form class="modal__form">
            <div class="systems">
                <img src="../../assets/icons/mastercard.png" class="img_payments" alt="card type">
                <input type="text" class="input input_card-number" placeholder="Card number">
            </div>
            <div class="modal__data">
                <input type="text" class="input input_name" placeholder="Name">
                <input type="phone" class="input input_phone" placeholder="Phone">
                <input type="text" class="input input_address" placeholder="Delivery address">
                <input type="email" class="input input_email" placeholder="E-mail">
                <input type="text" class="input input_valid" id="input_valid" placeholder="Validate date mm/yy">
                <input type="text" class="input input_code" id="input_code" placeholder="CVV">
            </div>
            <div class="buttons__wrapper">
            <button type="submit" class="button button_pay" disabled>Pay</button>
            </div>
        </form>`;
    }

    public drawForm(): void {
        this.parent.appendChild(this.modalWindow);

        const form: Element = document.querySelector('.modal__form')!;
        form.addEventListener('input', () => this.validateForm());

        const backgroundArea: Element =
            document.querySelector('.disabled-area')!;
        backgroundArea.classList.toggle('hidden');

        const cardNumber: HTMLInputElement =
            document.querySelector<HTMLInputElement>('.input_card-number')!;
        cardNumber.addEventListener('input', () => this.updateCardImage());

        const close: Element = document.querySelector('.modal__close')!;
        close.addEventListener('click', () => {
            backgroundArea.classList.toggle('hidden');
            this.closeWindow();
        });

        const buttonPay: Element = document.querySelector('.button_pay')!;
        buttonPay.addEventListener('click', () => {
            this.onClickButton(PageButtons.Pay);
        });
    }

    private closeWindow(): void {
        this.modalWindow.remove();
    }

    private checkCardNumber(): boolean {
        const cardNumber: HTMLInputElement =
            document.querySelector<HTMLInputElement>('.input_card-number')!;
        cardNumber.maxLength = this.maxLengthCardNumber;
        const value: string = cardNumber.value;
        cardNumber.value = value
            .replace(/[^\d]/g, '')
            .replace(/(.{4})/g, '$1 ')
            .trim();
        return value.length === this.maxLengthCardNumber;
    }

    private updateCardImage(): void {
        const cardNumber: HTMLInputElement =
            document.querySelector<HTMLInputElement>('.input_card-number')!;
        const cardImage: HTMLImageElement =
            document.querySelector<HTMLImageElement>('.img_payments')!;
        const value: string = cardNumber.value;
        if (value.charAt(0) === '4') {
            cardImage.src = '../../assets/icons/visa.png';
        } else if (value.charAt(0) === '5') {
            cardImage.src = '../../assets/icons/mastercard.png';
        } else {
            cardImage.src = '../../assets/icons/maestro.png';
        }
    }

    private checkName(): boolean {
        const fullName: HTMLInputElement =
            document.querySelector<HTMLInputElement>('.input_name')!;
        const value = fullName.value;
        const regexp: RegExp = /^[A-Za-z]{3,}\s[A-Za-z]{3,}(\s?[A-Za-z]{3,})*$/;
        return regexp.test(value);
    }

    private checkCvv(): boolean {
        const cvv: HTMLInputElement =
            document.querySelector<HTMLInputElement>('.input_code')!;
        cvv.maxLength = this.maxLengthCvv;
        const value: string = cvv.value;
        cvv.value = value.replace(/[^\d]/g, '');
        return value.length === this.maxLengthCvv;
    }

    private checkAddress(): boolean {
        const address: HTMLInputElement =
            document.querySelector<HTMLInputElement>('.input_address')!;
        const value: string = address.value;
        const regexp: RegExp =
            /^[A-Za-z0-9]{5,}\s[A-Za-z0-9]{5,}(\s?[A-Za-z0-9]{5,})*$/;
        return regexp.test(value);
    }

    private checkPhone(): boolean {
        const phone: HTMLInputElement =
            document.querySelector<HTMLInputElement>('.input_phone')!;
        const value: string = phone.value;
        phone.value = value.replace(/[^\+\d]/g, '');
        const regexp: RegExp = /^\+\d{9,}$/;
        return regexp.test(value);
    }

    private checkEmail(): boolean {
        const email: HTMLInputElement =
            document.querySelector<HTMLInputElement>('.input_email')!;
        const value = email.value;
        const regexp: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regexp.test(value);
    }

    private checkExpirationDate(): boolean {
        const expirationDate: HTMLInputElement =
            document.querySelector<HTMLInputElement>('.input_valid')!;
        expirationDate.maxLength = this.maxLengthDate;
        const value: string = expirationDate.value;
        expirationDate.value = value
            .replace(/[^\d]/g, '')
            .replace(/(^.{2})/g, '$1/');
        const dateArray: string[] = value.split('/');
        return Number(dateArray[0]) < 12 ? true : false;
    }

    private validateForm(): void {
        let isOk: boolean = false;
        isOk = this.checkCardNumber();
        isOk = this.checkName();
        isOk = this.checkEmail();
        isOk = this.checkPhone();
        isOk = this.checkExpirationDate();
        isOk = this.checkCvv();
        isOk = this.checkAddress();
        if (isOk) {
            const buttonPay: HTMLButtonElement =
                document.querySelector<HTMLButtonElement>('.button_pay')!;
            buttonPay.disabled = false;
        }
    }
}
