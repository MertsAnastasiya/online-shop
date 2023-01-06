import { OnButtonClick } from '../interfaces/customTypes';

export class Button {
    private parent: Element;
    private onClickButton: OnButtonClick;

    constructor(parent: Element, onClickButton: OnButtonClick) {
        this.parent = parent;
        this.onClickButton = onClickButton;
    }

    public drawButton(type: string) {
        const button = document.createElement('button');
        button.textContent = type;
        button.classList.add('button');
        button.classList.add(`button_${type}`);
        button.addEventListener('click', () => this.onClickButton(type));
        this.parent.appendChild(button);
    }
}
