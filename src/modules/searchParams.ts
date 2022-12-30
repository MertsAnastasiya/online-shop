export class SearchParams {
    private static readonly unused: string = '';

    public updateSearchParamByCheckbox(param: string, value: string, isAdd: boolean): void {
        const searchParams: URLSearchParams = new URLSearchParams(window.location.search);
        if (isAdd) {
            searchParams.append(param, value);
        } else {
            const currentParamValueArray: string[] = searchParams.getAll(param);
            const newCurrentValue: string[] = currentParamValueArray.filter((item) => item !== value);
            newCurrentValue.length !== 0
                ? searchParams.set(param, newCurrentValue.join('|'))
                : searchParams.delete(param);
        }
        this.updateUrl(searchParams);
    }

    public updateSearchParamBySlider(param: string, min: string, max: string): void {
        const searchParams: URLSearchParams = new URLSearchParams(window.location.search);
        searchParams.set(param, `${min}/${max}`);
        this.updateUrl(searchParams);
    }

    public updateSearchParamBySearch(param: string, value: string): void {
        const searchParams: URLSearchParams = new URLSearchParams(window.location.search);
        value !== '' ? searchParams.set(param, value) : searchParams.delete(param);
        this.updateUrl(searchParams);
    }

    private updateUrl(searchParams: URLSearchParams): void {
        if (searchParams.toString() !== '') {
            searchParams.sort();
            window.history.pushState(
                Object.fromEntries(searchParams.entries()),
                SearchParams.unused,
                `${window.location.pathname}?${searchParams.toString()}`
            );
        } else {
            window.history.pushState({}, SearchParams.unused, window.location.pathname);
        }
    }
}
