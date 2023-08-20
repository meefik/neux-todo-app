import { createState } from 'neux';
import l10n from '../l10n';
import router from '../router';

import sunIcon from '@svg-icons/fa-solid/sun.svg?raw';
import moonIcon from '@svg-icons/fa-solid/moon.svg?raw';
import chevronDownIcon from '@svg-icons/fa-solid/chevron-down.svg?raw';

const state = createState({
  dark: false
});
state.$$on('dark', (val) => {
  const classList = document.documentElement.classList;
  if (val) {
    classList.add('dark');
  } else {
    classList.remove('dark');
  }
});

export default function () {
  return {
    tagName: 'header',
    classList: ['border-b-2'],
    children: [{
      tagName: 'nav',
      classList: ['flex', 'my-4', 'gap-x-2'],
      children: [{
        tagName: 'h1',
        classList: ['flex-auto', 'text-2xl', 'font-bold', 'dark:text-white'],
        textContent: () => l10n.t(`${router.$path}.title`) || l10n.t('notfound.title')
      }, {
        tagName: 'button',
        classList: ['border', 'border-gray-300', 'focus:outline-none', 'hover:bg-gray-100',
          'focus:ring-4', 'focus:ring-gray-100', 'font-medium', 'rounded-full', 'p-2.5',
          'dark:bg-gray-700', 'dark:text-white', 'dark:border-gray-600', 'dark:hover:bg-gray-600',
          'dark:hover:border-gray-600', 'dark:focus:ring-gray-700'],
        children: () => {
          return {
            view: state.$dark ? moonIcon : sunIcon,
            classList: ['w-4', 'h-4']
          };
        },
        on: {
          click () {
            state.dark = !state.dark;
          }
        }
      }, {
        classList: ['relative', 'inline-block', 'text-left', 'group'],
        children: [{
          tagName: 'button',
          classList: ['flex-shrink-0', 'inline-flex', 'items-center', 'h-full', 'z-10', 'px-4',
            'text-sm', 'font-medium', 'text-center', 'border', 'border-gray-300', 'rounded-lg',
            'hover:bg-gray-100', 'focus:ring-4', 'focus:outline-none', 'focus:ring-gray-100',
            'dark:bg-gray-700', 'dark:hover:bg-gray-600', 'dark:focus:ring-gray-700', 'w-20',
            'dark:text-white', 'dark:border-gray-600'],
          children: [{
            textContent: () => l10n.t('language')
          }, {
            view: chevronDownIcon,
            classList: ['w-2.5', 'h-2.5', 'ml-2.5']
          }]
        }, {
          classList: () => {
            return ['absolute', 'bg-white', 'right-0', 'z-10', 'divide-y', 'divide-gray-100',
              'rounded-lg', 'shadow', 'w-20', 'dark:bg-gray-700', 'hidden', 'group-focus-within:block'];
          },
          children: [{
            tagName: 'ul',
            classList: ['py-2', 'text-sm', 'dark:text-white'],
            children: l10n.locales.map(lang => {
              return {
                tagName: 'li',
                children: [{
                  tagName: 'button',
                  classList: ['inline-flex', 'w-full', 'px-4', 'py-2', 'text-sm', 'hover:bg-gray-100',
                    'dark:text-white', 'dark:hover:bg-gray-600', 'dark:hover:text-white'],
                  textContent: l10n.t('language', lang),
                  on: {
                    click () {
                      l10n.lang = lang;
                    }
                  }
                }]
              };
            })
          }]
        }]
      }]
    }]
  };
}
