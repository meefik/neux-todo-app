import { createView } from 'neux';
import './index.css';
import l10n from './l10n';
import router from './router';
import Todo from './views/todo';
import NotFound from './views/notfound';

const views = {
  todo: Todo
};

createView({
  classList: ['container', 'mx-auto', 'px-4'],
  children: [{
    tagName: 'header',
    children: [{
      tagName: 'nav',
      classList: ['flex', 'my-5'],
      children: [{
        tagName: 'h1',
        classList: ['flex-auto', 'text-2xl', 'font-bold'],
        textContent: () => l10n.t(`${router.$path}.title`) || l10n.t('notfound.title')
      }, {
        tagName: 'span',
        classList: ['inline-flex', 'rounded-md', 'shadow-sm'],
        children: Object.keys(l10n.t('languages', 'en')).map(lang => {
          return {
            tagName: 'button',
            classList: () => {
              const curr = l10n.$lang === lang;
              return [
                'px-2', 'py-1', 'text-xs', 'font-semibold',
                'ring-1', 'ring-inset', 'ring-gray-300', 'hover:bg-yellow-200',
                'first:rounded-l-md', 'last:rounded-r-md',
                curr && 'bg-yellow-200', !curr && 'bg-indigo-50'
              ];
            },
            type: 'button',
            textContent: () => l10n.t(`languages.${lang}`, 'en'),
            on: {
              click: () => {
                l10n.lang = lang;
              }
            }
          };
        })
      }]
    }]
  }, {
    tagName: 'main',
    children: () => {
      const View = views[router.$path];
      return View || NotFound;
    }
  }, {
    tagName: 'footer',
    children: [{
      tagName: 'hr',
      classList: ['my-6', 'border-gray-200']
    }, {
      tagName: 'span',
      children: [{
        classList: ['text-sm', 'text-gray-500', 'text-center'],
        textContent: () => l10n.t('footer.text')
      }]
    }]
  }]
}, document.body);
