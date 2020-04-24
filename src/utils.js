export const getLang = () => document.documentElement.lang.slice(0, 2) || window.navigator.language.slice(0, 2);
