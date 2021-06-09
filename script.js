const root = document.documentElement;
const themeInput = document.getElementById('theme-input');
const newCardBtn = document.getElementById('card-new');
const newNoteTitle = document.getElementById('note-title');
const newNoteDesc = document.getElementById('note-description');
const formBtn = document.getElementById('form-btn');
const modal = document.getElementById('modal');
const cardContainer = document.getElementById('card-container');

let themeColor = '#0079bf';

let notes = [];

// Local Storage
const saveToLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const getFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

// Notes
const loadNotes = () => {
    cardContainer.innerHTML = '';
    notes.forEach((note) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const title = document.createElement('h3');
        title.classList.add('card-title');
        title.textContent = note.title;

        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-times');
        closeIcon.setAttribute('title', 'Delete Note');
        closeIcon.setAttribute('onclick', `deleteNote('${note.id}')`);

        const desc = document.createElement('p');
        desc.classList.add('card-text');
        desc.textContent = note.desc;

        title.appendChild(closeIcon);
        card.append(title, desc);

        cardContainer.appendChild(card);
    });
    cardContainer.appendChild(newCardBtn);
};

const deleteNote = (id) => {
    if (confirm('Delete note?')) {
        notes = notes.filter((note) => note.id != id);
        saveToLocalStorage('notes', notes);
        loadNotes();
    }
};

const clearNewNoteInputs = () => {
    newNoteTitle.value = '';
    newNoteDesc.value = '';
};

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

newCardBtn.addEventListener('click', showModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('modal-hide')) closeModal();
});

formBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!newNoteTitle.value || !newNoteDesc.value) {
        alert('Plase add Title and Description');
    } else {
        notes.push({
            id: Math.random(),
            title: newNoteTitle.value,
            desc: newNoteDesc.value,
        });
        saveToLocalStorage('notes', notes);
        loadNotes();
        closeModal();
        clearNewNoteInputs();
    }
});

// On Load
if (getFromLocalStorage('themeColor')) {
    themeColor = getFromLocalStorage('themeColor');
    setThemeColor();
} else {
    setThemeColor();
}

if (getFromLocalStorage('notes')) {
    notes = getFromLocalStorage('notes');
    loadNotes();
}
