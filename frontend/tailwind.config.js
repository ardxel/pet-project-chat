const appColors = [
  '--icon-bg',
  '--icon-color',
  '--bg',
  '--media-color',
  '--link-color',
  '--border',
  '--icon-active-color',
  '--icon-active-bg',
  '--active-link',
  '--aside-bg',
  '--heading-color',
  '--form-color',
  '--btn-bg',
];

/**
 * @type {import('tailwindcss').Config}
 */
const config = {
  content: ['./src/**/*.{ts,tsx}', './src/app/styles.css'],
  theme: {
    screens: {
      'h-md': { raw: '(min-height: 756px)' },
      xs3: '320px',
      xs2: '476px',
      xs1: '520px',
      xs0: '576px',
      1400: '1400px',
      ...require('tailwindcss/defaultTheme').screens,
    },
    colors: modernColors(appColors),
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};

/**
 * Функция принимает массив пееременных цветов и возвращает объект где ключ это тот же самый элемент
 * из массива, только без префикса "--", а значение это переменная.
 * @example --color => { color:  "rgb(var(--color) / <alpha-value>)" }
 * Значение свойства объекта выступает в роли modern RGB.
 * @param {string[]} colorVars - массив переменных цветов css
 * @returns {Record<string, string>} - возвращает дефолтные и кастомные стили.
 */
function modernColors(colorVars) {
  const colors = {};
  for (const color of colorVars) {
    const keyWithoutPrefix = color.replace('--', '');
    /**
     * Здесь используется специальный placeholder alpha-value, чтобы tailwind
     * мог добавлять альфа значения.
     * @see {@link https://tailwindcss.com/docs/customizing-colors}
     */
    colors[keyWithoutPrefix] = `rgb(var(${color}) / <alpha-value>)`;
  }
  return { ...require('tailwindcss/colors'), ...colors };
}

module.exports = config;
