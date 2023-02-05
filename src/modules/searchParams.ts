export class SearchParams {
    private static readonly unused: string = '';
    private searchParams: URLSearchParams = new URLSearchParams(window.location.search);

    public updateSearchParamByCheckbox(param: string, value: string, isAdd: boolean): void {
        if (isAdd) {
            const temp: string | null = this.searchParams.get(param);
            if (temp) {
                this.searchParams.set(param, `${temp}|${value}`);
            } else {
                this.searchParams.set(param, `${value}`);
            }
        } else {
            const currentParamValueArray: string[] = this.searchParams.get(param)!.split('|')!;
            const newCurrentValue: string[] = currentParamValueArray.filter((item) => item !== value);
            newCurrentValue.length !== 0
                ? this.searchParams.set(param, newCurrentValue.join('|'))
                : this.searchParams.delete(param);
        }
        this.updateUrl();
    }

    public updateSearchParamBySlider(param: string, min: string, max: string): void {
        this.searchParams.set(param, `${min}/${max}`);
        this.updateUrl();
    }

    public updateSearchParamBySort(value: string): void {
        this.searchParams.set('sort', value);
        this.updateUrl();
    }

    public updateSearchParamBySearch(param: string, value: string): void {
        value !== '' ? this.searchParams.set(param, value) : this.searchParams.delete(param);
        this.updateUrl();
    }

    private updateUrl(): void {
        if (this.searchParams.toString() !== '') {
            this.searchParams.sort();
            window.history.pushState(
                Object.fromEntries(this.searchParams.entries()),
                SearchParams.unused,
                `${window.location.pathname}?${this.searchParams.toString()}`
            );
        } else {
            this.clearUrl();
        }
    }

    public clearUrl(): void {
        window.location.search = '';
        window.history.pushState({}, SearchParams.unused, window.location.pathname);
    }
}
