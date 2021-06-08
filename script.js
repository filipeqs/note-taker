(function () {
    const root = document.documentElement;
    const themeInput = document.getElementById('theme-input');
    const newCard = document.getElementById('card-new');
    const newNoteTitle = document.getElementById('note-title');
    const newNoteDesc = document.getElementById('note-description');
    const formBtn = document.getElementById('form-btn');
    const modal = document.getElementById('modal');

    let themeColor = '#0079bf';

    // Local Storage
    const saveToLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));

    const getFromLocalStorage = (key) => localStorage.getItem(key);

    // Theme
    const isDark = (hexcolor) => {
        var r = parseInt(hexcolor.substr(0, 2), 16);
        var g = parseInt(hexcolor.substr(2, 2), 16);
        var b = parseInt(hexcolor.substr(4, 2), 16);
        var yiq = (r * 299 + g * 587 + b * 114) / 1000;
        return yiq <= 128 ? true : false;
    };

    const setColorPicker = () => (themeInput.value = themeColor);

    const setTextColor = () => {
        isDark(themeColor.substr(1, 6))
            ? root.style.setProperty('--text-color', '#ffffff')
            : root.style.setProperty('--text-color', '#000000');
    };

    const setThemeColor = () => {
        root.style.setProperty('--primari-color', themeColor);
        saveToLocalStorage('themeColor', themeColor);
        setColorPicker();
        setTextColor();
    };

    // Modal
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
    if (getFromLocalStorage('themeColor')) {
        themeColor = JSON.parse(getFromLocalStorage('themeColor'));
        setThemeColor();
    } else {
        setThemeColor();
    }
})();
