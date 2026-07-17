function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const translation = translations[lang]?.[element.dataset.i18n];
    if (!translation) return;
    if (element.tagName === 'TITLE') {
      element.textContent = translation;
    } else if (/<[a-z][\s\S]*>/i.test(translation)) {
      element.innerHTML = translation;
    } else {
      element.textContent = translation;
    }
  });

  document.getElementById('lang-ja').classList.toggle('active', lang === 'ja');
  document.getElementById('lang-en').classList.toggle('active', lang === 'en');
  localStorage.setItem('preferredLanguage', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('lang-ja').addEventListener('click', () => setLanguage('ja'));
  document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
  const preferredLanguage = localStorage.getItem('preferredLanguage');
  const browserLanguage = navigator.language.split('-')[0];
  setLanguage(preferredLanguage || (browserLanguage === 'en' ? 'en' : 'ja'));
});
