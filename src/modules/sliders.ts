// import { dataBase } from "./database";
import { productsData } from "../components/data";
import { IProduct } from "../components/interfaces/product.interface";


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

    public setMinMax(value: string): void{
        const arr = [];
        let maxTemp = 0;

        for(let i = 0; i < productsData.length - 1; i++){
            arr.push(productsData[i]![value as keyof IProduct]);
        }

        for(const el of arr){
            if(Number(el) > maxTemp){
                maxTemp = Number(el);
            }
        };

        this.maxRange.max = `${maxTemp}`;
        this.maxRange.value = `${maxTemp}`;
        this.minRange.max = `${maxTemp}`;
        this.maxPrice.innerHTML = `${this.currency}${maxTemp}`;

        let minTemp = maxTemp;

        for(const el of arr){
            if(Number(el) < maxTemp){
                minTemp = Number(el);
                maxTemp = Number(el);
            }
        };

        this.maxRange.min = `${minTemp}`;
        this.minRange.value = `${minTemp}`;
        this.minRange.min = `${minTemp}`;
        this.minPrice.innerHTML = `${this.currency}${minTemp}`;
    }


    public showValues(): void{
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
priceSlider.setMinMax('price');

const stockSlider = new DualSlider(minStockRange, maxStockRange, minStockSpan, maxStockSpan);
stockSlider.showValues();
stockSlider.setMinMax('stock');