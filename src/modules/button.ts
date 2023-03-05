import { OnButtonClick, PageButtons } from './interfaces/customTypes';

export class Button {
    private readonly parent: Element;
    private readonly onClickButton: OnButtonClick;

    constructor(parent: Element, onClickButton: OnButtonClick) {
        this.parent = parent;
        this.onClickButton = onClickButton;
    }

    public drawButton(type: PageButtons): void {
        const button: Element = document.createElement('div');
        button.textContent = type;
        button.classList.add('button');
        button.classList.add(`button_${type}`);
        button.addEventListener('click', () => this.onClickButton(type));
        this.parent.appendChild(button);
    }
}
