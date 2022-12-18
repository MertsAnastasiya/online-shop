class DualSlider{
    minRange: HTMLInputElement;
    maxRange: HTMLInputElement;
    minPrice: HTMLElement;
    maxPrice: HTMLElement;
    startSymbol: string;
    endSymbol: string;

    constructor(minRange: HTMLInputElement, maxRange: HTMLInputElement, minPrice: HTMLElement, maxPrice: HTMLElement, startSymbol='', endSymbol=''){
        this.minRange = minRange; //first input range
        this.maxRange = maxRange; //second input range
        this.minPrice = minPrice; //first span for min price
        this.maxPrice = maxPrice; //second span for max price
        this.startSymbol = startSymbol;
        this.endSymbol = endSymbol;

    }

    showValues(){
        this.minRange.addEventListener('input', () => {
            this.minPrice.innerHTML = `${this.startSymbol}${this.minRange.value}${this.endSymbol}`;
            if(Number(this.minRange.value) > Number(this.maxRange.value)){
                this.maxPrice.innerHTML = `${this.startSymbol}${this.minRange.value}${this.endSymbol}`;
                this.minPrice.innerHTML = `${this.startSymbol}${this.maxRange.value}${this.endSymbol}`;
            }
        });

        this.maxRange.addEventListener('input', () => {
            this.maxPrice.innerHTML = `${this.startSymbol}${this.maxRange.value}${this.endSymbol}`;
            if(Number(this.minRange.value) > Number(this.maxRange.value)){
                this.minPrice.innerHTML = `${this.startSymbol}${this.maxRange.value}${this.endSymbol}`;
                this.maxPrice.innerHTML = `${this.startSymbol}${this.minRange.value}${this.endSymbol}`;
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


const priceSlider = new DualSlider(minRange, maxRange, minPrice, maxPrice, '€ ', '.00');
priceSlider.showValues();

const stockSlider = new DualSlider(minStockRange, maxStockRange, minStockSpan, maxStockSpan);
stockSlider.showValues();