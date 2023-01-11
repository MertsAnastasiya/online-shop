export class PaymentForm {
    private modalWindow: Element;
    private parent: Element;

    constructor(parent: Element) {
        this.parent = parent;
        this.modalWindow = document.createElement('div');
        this.modalWindow.classList.add('modal-window');
        this.modalWindow.classList.add('display-none');
        this.modalWindow.innerHTML = `
        <p class="modal__close">&times;</p>
        <p class="modal__text">Make a payment</p>
        <form class="modal__form">
            <div class="systems">
            <img src="../../assets/icons/mastercard.png" class="img_payments" alt="card type">
            <input type="text" class="input input_card-number">
            </div>
            <div class="modal__data">
            <input type="text" class="input input_name" placeholder="Name">
            <input type="phone" class="input input_phone" placeholder="Phone">
            <input type="text" class="input input_address" placeholder="Delivery address">
            <input type="email" class="input input_email" placeholder="E-mail">
            <input type="text" class="input input_valid" id="input_valid" placeholder="Valid date">
            <input type="text" class="input input_code" id="input_code" placeholder="CVV">
            </div>
            <div class="buttons__wrapper">
            <button type="submit" class="button button-pay" disabled>Pay</button>
            </div>
        </form>`;
    }

    public drawForm(): void {
        this.parent.appendChild(this.modalWindow);
        const form = document.querySelector('.modal__form')!;
        form.addEventListener('onchange', () => this.validateForm);
        const cardNumber = document.querySelector('.input_card-number')! as HTMLInputElement;
        cardNumber.addEventListener('input', () => this.updateCardImage);
    }

    private checkCardNumber(): boolean {
        const cardNumber = document.querySelector('.input_card-number')! as HTMLInputElement;
        cardNumber.maxLength = 16;
        const value = cardNumber.value;
        cardNumber.value = value.replace(/[^\d]/g, '');
        if (value.length === 16) {
            return true;
        } else {
            return false;
        }
    }

    private updateCardImage(): void {
        const cardNumber = document.querySelector('.input_card-number')! as HTMLInputElement;
        const cardImage = document.querySelector('.img_payments')! as HTMLImageElement;
        const value = cardNumber.value;
        if (value.charAt(0) === '4') {
            cardImage.src = '../../assets/icons/visa.png';
        } else if (value.charAt(0) === '5') {
            cardImage.src = '../../assets/icons/mastercard.png';
        } else {
            cardImage.src = '../../assets/icons/maestro.png';
        }
    }

    private checkName(): boolean {
        const fullName = document.querySelector('.input_name')! as HTMLInputElement;
        const value = fullName.value;
        const regexp: RegExp = /^[A-Za-z]{3,}\s[A-Za-z]{3,}(\s?[A-Za-z]{3,})*$/;
        if (regexp.test(value)) {
            return true;
        } else {
            return false;
        }
    }

    private checkCvv(): boolean {
        const cvv = document.querySelector('.input_code')! as HTMLInputElement;
        cvv.maxLength = 3;
        const value = cvv.value;
        cvv.value = value.replace(/[^\d]/g, '');
        if (value.length < 3) {
            return false;
        } else {
            return true;
        }
    }

    private checkAddress() {
        const address = document.querySelector('.input_address')! as HTMLInputElement;
        const value = address.value;
        const regexp: RegExp = /^[A-Za-z]{5,}\s[A-Za-z]{5,}(\s?[A-Za-z]{5,})*$/;
        if (regexp.test(value)) {
            return true;
        } else {
            return false;
        }
    }

    private checkPhone(): boolean {
        const phone = document.querySelector('.input_phone')! as HTMLInputElement;
        const value = phone.value;
        phone.value = value.replace(/[^\d]/g, '');
        const regexp: RegExp = /^\+[0-9]{9,15}/;
        if (regexp.test(value)) {
            return true;
        } else {
            return false;
        }
    }

    private checkEmail(): boolean {
        const email = document.querySelector('.input_email')! as HTMLInputElement;
        const value = email.value;
        const regexp: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (regexp.test(value)) {
            return true;
        } else {
            return false;
        }
    }

    private checkExpirationDate(): boolean {
        const expirationDate = document.querySelector('.input_valid')! as HTMLInputElement;
        expirationDate.maxLength = 5;
        const value = expirationDate.value;
        const regexp: RegExp = /^\d{4}$/;
        if (
            regexp.test(value) &&
            Number(value.slice(0, 2)) <= 12 &&
            Number(value.slice(0, 2)) > 0
        ) {
            expirationDate.value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
            return true;
        } else {
            expirationDate.value = value.replace(/[^\d]/g, '');
            return false;
        }
    }

    private validateForm() {
        let isOk = false;
        isOk = this.checkCardNumber();
        isOk = this.checkName();
        isOk = this.checkEmail();
        isOk = this.checkPhone();
        isOk = this.checkExpirationDate();
        isOk = this.checkCvv();
        isOk = this.checkAddress();
        if (isOk) {
            const buttonBuy = document.querySelector('.button-pay')! as HTMLButtonElement;
            buttonBuy.disabled = false;
        }
    }
}
