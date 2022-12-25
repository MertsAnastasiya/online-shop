const wrapperProducts = document.querySelector('.products');
const switchTo5Column = document.querySelector('.view_5');
const switchTo3Column = document.querySelector('.view_3');

switchTo5Column.addEventListener('click', () => {
    wrapperProducts.classList.add('layout-5-column');
});

switchTo3Column.addEventListener('click', () => {
    if(wrapperProducts.classList.contains('layout-5-column')) {
        wrapperProducts.classList.remove('layout-5-column')
    }
})
