import {
    CallbackViewChanged,
    SliderType,
    SliderValue,
} from '../interfaces/customTypes';

export class DualSlider {
    private min: number;
    private max: number;
    private step: string;
    private sliderType: SliderType;
    private currentValue: SliderValue;
    private parent: Element;
    private onChangeSliders: CallbackViewChanged;

    constructor(
        parent: Element,
        min: number,
        max: number,
        step: string,
        wrapperSliders: SliderType,
        onChangeSliders: CallbackViewChanged
    ) {
        this.parent = parent;
        this.min = min;
        this.max = max;
        this.sliderType = wrapperSliders;
        this.step = step;
        this.currentValue = { min: min, max: max };
        this.onChangeSliders = onChangeSliders;
    }

    public drawSlider(): void {
        const slider: Element = document.createElement('div');
        slider.classList.add(`${this.sliderType}-slider`, 'slider');

        const title: Element = document.createElement('p');
        title.classList.add('filter__title', 'slider-descriptor');
        const sliderTitle: string = `${this.sliderType
            .charAt(0)
            .toUpperCase()}${this.sliderType.slice(1)}`;
        if (this.sliderType === 'price') {
            title.innerHTML = `${sliderTitle}, €`;
        } else {
            title.innerHTML = sliderTitle;
        }
        slider.appendChild(title);

        const range: HTMLElement = document.createElement('span');
        range.classList.add(`${this.sliderType}-range`);

        const inputMin: HTMLInputElement = document.createElement('input');
        inputMin.classList.add(`${this.sliderType}-range__input1`);
        inputMin.type = 'range';
        inputMin.id = 'lower';
        inputMin.step = this.step;
        inputMin.min = String(this.min);
        inputMin.max = String(this.max);
        inputMin.value = String(this.min);

        const inputMax: HTMLInputElement = document.createElement('input');
        inputMax.classList.add(`${this.sliderType}-range__input2`);
        inputMax.type = 'range';
        inputMax.id = 'upper';
        inputMax.step = this.step;
        inputMax.min = String(this.min);
        inputMax.max = String(this.max);
        inputMax.value = String(this.max);

        range.appendChild(inputMin);
        range.appendChild(inputMax);

        slider.appendChild(range);

        const spans: HTMLElement = document.createElement('div');
        spans.classList.add(`${this.sliderType}-spans`);

        const spanMin: HTMLElement = document.createElement('span');
        spanMin.classList.add(`${this.sliderType}-spans__min`);
        spanMin.innerHTML = `${this.min}`;

        const spanMax: HTMLElement = document.createElement('span');
        spanMax.classList.add(`${this.sliderType}-spans__max`);
        spanMax.innerHTML = `${this.max}`;

        spans.appendChild(spanMin);
        spans.appendChild(spanMax);

        inputMin.addEventListener('input', () => {
            spanMin.innerHTML = `${inputMin.value}`;
            this.currentValue['min'] = Number(inputMin.value);
            this.onChangeSliders(this.sliderType, this.currentValue);
        });

        inputMax.addEventListener('input', () => {
            spanMax.innerHTML = `${inputMax.value}`;
            this.currentValue['max'] = Number(inputMax.value);
            this.onChangeSliders(this.sliderType, this.currentValue);
        });

        slider.appendChild(spans);
        this.parent.appendChild(slider);
    }
}
