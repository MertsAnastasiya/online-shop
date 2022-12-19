import { dataBase } from "./database";

class DualSlider{
    private minRange: HTMLInputElement; //first input range
    private maxRange: HTMLInputElement; //second input range
    private minPrice: HTMLElement; //first span for min price
    private maxPrice: HTMLElement; //second span for max price
    private currency: string; //currency

    constructor(minRange: HTMLInputElement, maxRange: HTMLInputElement, minPrice: HTMLElement, maxPrice: HTMLElement, currency=''){
        this.minRange = minRange; 
        this.maxRange = maxRange; 
        this.minPrice = minPrice; 
        this.maxPrice = maxPrice; 
        this.currency = currency;
    }


    showValues(){
        this.minRange.addEventListener('input', () => {
            this.minPrice.innerHTML = `${this.currency}${this.minRange.value}`;
            if(Number(this.minRange.value) > Number(this.maxRange.value)){
                this.maxPrice.innerHTML = `${this.currency}${this.minRange.value}`;
                this.minPrice.innerHTML = `${this.currency}${this.maxRange.value}`;
            }
        });

        this.maxRange.addEventListener('input', () => {
            this.maxPrice.innerHTML = `${this.currency}${this.maxRange.value}`;
            if(Number(this.minRange.value) > Number(this.maxRange.value)){
                this.minPrice.innerHTML = `${this.currency}${this.maxRange.value}`;
                this.maxPrice.innerHTML = `${this.currency}${this.minRange.value}`;
            }
        });
    }
};

//Elements for price dual slider
const minRange = document.querySelector('#price-range-start') as HTMLInputElement;
const maxRange = document.querySelector("#price-range-finish") as HTMLInputElement;
const minPrice = document.querySelector(".price-spans__span-min") as HTMLSpanElement;
const maxPrice = document.querySelector(".price-spans__span-max") as HTMLElement;

//Elements for stock dual slider
const minStockRange = document.querySelector('#stock-range-start') as HTMLInputElement;
const maxStockRange = document.querySelector('#stock-range-finish') as HTMLInputElement;
const minStockSpan = document.querySelector('.stock-spans__span-min') as HTMLSpanElement;
const maxStockSpan = document.querySelector('.stock-spans__span-max') as HTMLSpanElement;


const priceSlider = new DualSlider(minRange, maxRange, minPrice, maxPrice, '€');
priceSlider.showValues();
// priceSlider.setMaxValue();

const stockSlider = new DualSlider(minStockRange, maxStockRange, minStockSpan, maxStockSpan);
stockSlider.showValues();