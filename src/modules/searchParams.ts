export class SearchParams {
    public updateSearchParamByCheckbox(param: string, value: string, isAdd: boolean): void {
        let searchParams: URLSearchParams = new URLSearchParams(window.location.search);
        if (isAdd) {
            searchParams.append(param, value);
        } else {
            const currentParamValueArray: string[] = searchParams.getAll(param);
            const newCurrentValue: string[] = currentParamValueArray.filter((item) => item !== value);
            newCurrentValue.length !== 0
                ? searchParams.set(param, newCurrentValue.join('|'))
                : searchParams.delete(param);
        }
        if (searchParams.toString()) {
            searchParams.sort();
            window.history.pushState(
                Object.fromEntries(searchParams.entries()),
                ' ',
                `${window.location.pathname}?${searchParams.toString()}`
            );
        } else {
            window.history.pushState({}, ' ', window.location.pathname);
        }
    }

    public updateSearchParamBySlider(param: string, min: string, max: string): void {
        let searchParams: URLSearchParams = new URLSearchParams(window.location.search);
        searchParams.set(param, `${min}/${max}`);
        window.history.pushState(
            Object.fromEntries(searchParams.entries()),
            ' ',
            `${window.location.pathname}?${searchParams.toString()}`
        );
    }
}
