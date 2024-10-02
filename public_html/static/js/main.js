const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

let currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark' || (!currentTheme && userPrefersDark)) document.body.classList.add('dark-mode');
else document.body.classList.remove('dark-mode');

document.getElementById('theme-toggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) localStorage.setItem('theme', 'dark');
    else localStorage.setItem('theme', 'light');
});