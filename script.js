(function () {
    const body = document.querySelector('body');
    const themeInput = document.getElementById('theme-input');
    let themeColor = '#0079bf';

    const setThemeColor = () => {
        localStorage.setItem('themeColor', JSON.stringify(themeColor));
        themeInput.value = themeColor;
        body.style.backgroundColor = themeColor;
    };

    // Event Listeners
    themeInput.addEventListener('change', (e) => {
        themeColor = e.target.value;
        setThemeColor();
    });

    // On Load
    if (localStorage.getItem('themeColor')) {
        themeColor = JSON.parse(localStorage.getItem('themeColor'));
        setThemeColor();
    } else {
        setThemeColor();
    }
})();
