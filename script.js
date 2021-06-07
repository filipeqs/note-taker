(function () {
    const body = document.querySelector('body');
    const themeInput = document.getElementById('theme-input');
    const newCard = document.getElementById('card-new');
    let themeColor = '#0079bf';

    const isDark = (hexcolor) => {
        var r = parseInt(hexcolor.substr(0, 2), 16);
        var g = parseInt(hexcolor.substr(2, 2), 16);
        var b = parseInt(hexcolor.substr(4, 2), 16);
        var yiq = (r * 299 + g * 587 + b * 114) / 1000;
        return yiq <= 128 ? true : false;
    };

    const setThemeColor = () => {
        localStorage.setItem('themeColor', JSON.stringify(themeColor));
        themeInput.value = themeColor;
        body.style.backgroundColor = themeColor;
        isDark(themeColor.substr(1, 6))
            ? (newCard.style.color = '#ffffff')
            : (newCard.style.color = '#000000');
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
