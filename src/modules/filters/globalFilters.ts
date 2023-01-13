import { CheckboxFilter } from './checkboxFilters';
import {
    CallbackOnChangeFilters,
    ToChangeParamsByCheckbox,
    ToChangeParamsBySlider,
    FilterType,
    SliderType,
    SliderValue,
    ToChangeParamsBySearch,
} from '../interfaces/customTypes';
import { IProduct } from '../interfaces/product.interface';
import { DualSlider } from './sliders';
import { Search } from './search';

//I'll change it later when all layout is refactored
const wrapperFiltres: Element = document.querySelector('.filters')!;
const wrapperSliders: Element = document.querySelector('.sliders')!;

export class GlobalFilters {
    private currentFilters: Map<FilterType, Set<string>>;
    private currentSliders: Map<SliderType, SliderValue>;
    private currentSearch: string;

    private callbackOnChangeFilters: CallbackOnChangeFilters;
    private toChangeParamsByCheckbox: ToChangeParamsByCheckbox;
    private toChangeParamsBySlider: ToChangeParamsBySlider;
    private toChangeParamsBySearch: ToChangeParamsBySearch;

    constructor(
        callbackOnChangeFilters: CallbackOnChangeFilters,
        toChangeSearchParamsCheckbox: ToChangeParamsByCheckbox,
        toChangeSearchParamsSlider: ToChangeParamsBySlider,
        toChangeParamsBySearch: ToChangeParamsBySearch
    ) {
        this.currentFilters = new Map();
        this.currentSliders = new Map();
        this.currentSearch = '';

        this.callbackOnChangeFilters = callbackOnChangeFilters;
        this.toChangeParamsByCheckbox = toChangeSearchParamsCheckbox;
        this.toChangeParamsBySlider = toChangeSearchParamsSlider;
        this.toChangeParamsBySearch = toChangeParamsBySearch;
    }

    public createFilters(productsData: IProduct[]): void {
        const filterCategory: CheckboxFilter = new CheckboxFilter(
            wrapperFiltres,
            'category',
            (filterType: FilterType, value: string, isAdded: boolean) =>
                this.updateCurrentFiltersState(filterType, value, isAdded)
        );

        const filterBrand: CheckboxFilter = new CheckboxFilter(
            wrapperFiltres,
            'brand',
            (filterType: FilterType, value: string, isAdded: boolean) =>
                this.updateCurrentFiltersState(filterType, value, isAdded)
        );

        const sliderPrice: DualSlider = new DualSlider(
            wrapperSliders,
            this.getMin(productsData, 'price'),
            this.getMax(productsData, 'price'),
            '1',
            'price',
            (sliderType: SliderType, currentSliderValue: SliderValue) =>
                this.updateCurrentSliderState(sliderType, currentSliderValue)
        );

        const sliderStock: DualSlider = new DualSlider(
            wrapperSliders,
            this.getMin(productsData, 'stock'),
            this.getMax(productsData, 'stock'),
            '1',
            'stock',
            (sliderType: SliderType, currentSliderValue: SliderValue) =>
                this.updateCurrentSliderState(sliderType, currentSliderValue)
        );

        const search: Search = new Search(
            document.querySelector('.header__container')!,
            (param: string, value: string) => this.onChangeSearch(param, value)
        );

        filterCategory.drawFilter(productsData);
        filterBrand.drawFilter(productsData);
        sliderPrice.drawSlider();
        sliderStock.drawSlider();

        search.drawSearch();
    }

    public updateCurrentSliderState(
        sliderType: SliderType,
        currentSliderValue: SliderValue
    ): void {
        this.currentSliders.set(sliderType, currentSliderValue);
        this.toChangeParamsBySlider(
            sliderType,
            currentSliderValue.min.toString(),
            currentSliderValue.max.toString()
        );
        this.callbackOnChangeFilters(
            this.currentFilters,
            this.currentSliders,
            this.currentSearch
        );
    }

    public updateCurrentFiltersState(
        filterType: FilterType,
        value: string,
        isAdded: boolean
    ): void {
        const setSelectedCheckbox: Set<string> =
            this.currentFilters.get(filterType) || new Set<string>();
        isAdded
            ? setSelectedCheckbox?.add(value)
            : setSelectedCheckbox?.delete(value);
        this.currentFilters.set(filterType, setSelectedCheckbox);

        this.toChangeParamsByCheckbox(filterType, value, isAdded);
        this.callbackOnChangeFilters(
            this.currentFilters,
            this.currentSliders,
            this.currentSearch
        );
    }

    public getCurrentFilters(): Map<FilterType, Set<string>> {
        return this.currentFilters;
    }

    public getCurrentSliders(): Map<SliderType, SliderValue> {
        return this.currentSliders;
    }

    public setCurrentFilters(filterType: FilterType, value: string): void {
        const setSelectedCheckbox: Set<string> = this.currentFilters.get(filterType) || new Set<string>();
        setSelectedCheckbox.add(value);

        this.currentFilters.set(filterType, setSelectedCheckbox);
    }

    public setCurrentSliders(sliderType: SliderType, value: SliderValue): void {
        const sliderMax = document.querySelector(`.${sliderType}-max`)! as HTMLInputElement;
        const sliderMin = document.querySelector(`.${sliderType}-min`)! as HTMLInputElement;
        const spanMax: Element = document.querySelector(`.${sliderType}-spans__max`)!;
        const spanMin: Element = document.querySelector(`.${sliderType}-spans__min`)!;
        sliderMax.value = value.max.toString();
        sliderMin.value = value.min.toString();
        spanMax.innerHTML = value.max.toString();
        spanMin.innerHTML = value.min.toString();
        this.currentSliders.set(sliderType, value);
    }

    public clearFilters(): void {
        this.currentFilters.clear();
        this.currentSearch = '';
        this.currentSliders.clear();
        this.callbackOnChangeFilters(
            this.currentFilters,
            this.currentSliders,
            this.currentSearch
        );
    }

    public onChangeSearch(param: string, value: string): void {
        this.currentSearch = value;
        this.toChangeParamsBySearch(param, this.currentSearch);
        this.callbackOnChangeFilters(
            this.currentFilters,
            this.currentSliders,
            this.currentSearch
        );
    }

    private getMax(data: IProduct[], property: keyof IProduct): number {
        return  Math.max(...data.map(element => Number(element[property])));
    }

    private getMin(data: IProduct[], property: keyof IProduct): number {
        return  Math.min(...data.map(element => Number(element[property])));

    }
}
