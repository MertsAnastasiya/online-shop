import { CallbackViewChanged, FilterTypeSliders, SliderValue } from '../interfaces/customTypes';


export class DualSlider {
    private min: number;
    private max: number;
    private step: string;
    private type: FilterTypeSliders;
    private callback: CallbackViewChanged;
    private currentValue: SliderValue;

    constructor(min: number, max: number, step: string, type: FilterTypeSliders, callback: CallbackViewChanged)
    {
        this.min = min;
        this.max = max;
        this.type = type;
        this.step = step;
        this.currentValue = {'min': min, 'max': max};
        this.callback = callback;
    }

    public drawSlider() {
        const wrapperSliders = document.querySelector('.sliders')!;

        const slider = document.createElement('div')
        slider.classList.add(`${this.type}-slider`, 'slider');

        const title = document.createElement('p');
        title.classList.add('filter__title', 'slider-descriptor');
        title.innerHTML = `${this.type.charAt(0).toUpperCase()}${this.type.slice(1)},  €`;
        slider.appendChild(title);

        const range: HTMLElement = document.createElement('span');
        range.classList.add(`${this.type}-range`);

        const inputMin: HTMLInputElement = document.createElement('input');
        inputMin.classList.add(`${this.type}-range__input1`);
        inputMin.type = 'range';
        inputMin.id = 'lower';
        inputMin.step = this.step;
        inputMin.min = String(this.min);
        inputMin.max = String(this.max);
        inputMin.value = String(this.min);

        const inputMax: HTMLInputElement = document.createElement('input');
        inputMax.classList.add(`${this.type}-range__input2`);
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
        spans.classList.add(`${this.type}-spans`);

        const spanMin: HTMLElement = document.createElement('span');
        spanMin.classList.add(`${this.type}-spans__min`);
        spanMin.innerHTML = `${this.min}`;

        const spanMax: HTMLElement = document.createElement('span');
        spanMax.classList.add(`${this.type}-spans__max`);
        spanMax.innerHTML = `${this.max}`;

        spans.appendChild(spanMin);
        spans.appendChild(spanMax);

        inputMin.addEventListener('input', () => {
            spanMin.innerHTML = `${inputMin.value}`;
            this.currentValue['min'] = Number(inputMin.value);
            this.callback();
        });

        inputMax.addEventListener('input', () => {
            spanMax.innerHTML = `${inputMax.value}`;
            this.currentValue['max'] = Number(inputMax.value);
            this.callback();
        });

        slider.appendChild(spans);
        wrapperSliders.appendChild(slider);
    }

    public getSliderType(): FilterTypeSliders {
        return this.type;
    }

    public getCurrentSliders(): SliderValue {
        return this.currentValue;
    }
}
