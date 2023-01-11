import { OnClickButton } from '../interfaces/customTypes';

export class Button {
    private parent: Element;
    private onClickButton: OnClickButton;

    constructor(parent: Element, onClickButton: OnClickButton) {
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
