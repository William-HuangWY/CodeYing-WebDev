const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
let currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark' || (!currentTheme && userPrefersDark)) document.body.classList.add('dark-mode');
else document.body.classList.remove('dark-mode');
document.getElementById('theme-toggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) localStorage.setItem('theme', 'dark');
    else localStorage.setItem('theme', 'light');
});

const menubarToggleButton = document.querySelector('.menubar-toggle-button');
const menubarToggleButtonIcon = document.querySelector('.menubar-toggle-button i');
const menubarDropdownMenu = document.querySelector('.menubar-dropdown-menu');
menubarToggleButton.onclick = function () {
    menubarDropdownMenu.classList.toggle('open');
    const isOpen = menubarDropdownMenu.classList.contains('open');
    menubarToggleButtonIcon.classList.remove('fa-xmark', 'fa-bars');
    menubarToggleButtonIcon.classList.add(isOpen ? 'fa-xmark' : 'fa-bars');
};