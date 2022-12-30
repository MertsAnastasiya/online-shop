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
        this.updateSearchParams(searchParams);
    }

    public updateSearchParamBySlider(param: string, min: string, max: string): void {
        const searchParams: URLSearchParams = new URLSearchParams(window.location.search);
        searchParams.set(param, `${min}/${max}`);
        this.updateSearchParams(searchParams);
    }

    private updateSearchParams(searchParams: URLSearchParams): void {
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
