(function () {
    const body = document.querySelector('body');
    const themeInput = document.getElementById('theme-input');
    const newCard = document.getElementById('card-new');
    const newNoteTitle = document.getElementById('note-title');
    const newNoteDesc = document.getElementById('note-description');
    const modal = document.getElementById('modal');

    let themeColor = '#0079bf';

    const isDark = (hexcolor) => {
        var r = parseInt(hexcolor.substr(0, 2), 16);
        var g = parseInt(hexcolor.substr(2, 2), 16);
        var b = parseInt(hexcolor.substr(4, 2), 16);
        var yiq = (r * 299 + g * 587 + b * 114) / 1000;
        return yiq <= 128 ? true : false;
    };

    const setBodyColor = () => (body.style.backgroundColor = themeColor);

    const setInputBorderColor = () => {
        newNoteTitle.style.borderColor = themeColor;
        newNoteDesc.style.borderColor = themeColor;
    };

    const setThemeColor = () => {
        localStorage.setItem('themeColor', JSON.stringify(themeColor));
        themeInput.value = themeColor;
        setBodyColor();
        setInputBorderColor();
        isDark(themeColor.substr(1, 6))
            ? (newCard.style.color = '#ffffff')
            : (newCard.style.color = '#000000');
    };

    const closeModal = () => {
        modal.classList.add('modal-hide');
    };

    const showModal = () => {
        modal.classList.remove('modal-hide');
    };

    // Event Listeners
    themeInput.addEventListener('change', (e) => {
        themeColor = e.target.value;
        setThemeColor();
    });

    newCard.addEventListener('click', showModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('modal-hide')) closeModal();
    });

    // On Load
    if (localStorage.getItem('themeColor')) {
        themeColor = JSON.parse(localStorage.getItem('themeColor'));
        setThemeColor();
    } else {
        setThemeColor();
    }
})();
