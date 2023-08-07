import { createState, createSync } from 'neux';
import l10n from '../l10n';
import router from '../router';

import circleXmarkIcon from '@svg-icons/fa-solid/circle-xmark.svg?raw';

const state = createState({
  list: []
});
const syncer = (newv, oldv, diff) => {
  if (!oldv) {
    return JSON.parse(localStorage.getItem('todos') || '[]');
  } else {
    localStorage.setItem('todos', JSON.stringify(newv));
  }
  return newv;
};
const sync = createSync(state.list, syncer, { slippage: 100 });
state.list.$$on('*', () => sync());

export default function () {
  sync();
  return {
    tagName: 'section',
    children: [{
      classList: ['relative'],
      children: [{
        tagName: 'label',
        classList: ['absolute', '-top-2', 'left-2', 'px-1',
          'inline-block', 'bg-white', 'text-xs', 'text-gray-900', 'dark:bg-gray-900',
          'dark:text-white'],
        textContent: () => l10n.t('todo.newtask')
      }, {
        tagName: 'input',
        placeholder: () => l10n.t('todo.input'),
        autofocus: true,
        classList: ['block', 'w-full', 'py-1.5', 'px-3', 'rounded-md', 'border-0', 'text-gray-900',
          'ring-1', 'ring-inset', 'ring-gray-400', 'placeholder:text-gray-400', 'focus:ring-indigo-400',
          'outline-0', 'dark:bg-gray-900', 'dark:text-white'],
        on: {
          keyup: (e) => {
            if (e.keyCode === 13) {
              e.preventDefault();
              state.list.push({
                id: `${Date.now()}`,
                text: e.target.value
              });
              e.target.value = '';
            }
          }
        }
      }]
    }, {
      classList: ['flex', 'items-center', 'gap-x-3', 'my-3'],
      children: [{
        tagName: 'input',
        type: 'checkbox',
        classList: ['h-4', 'w-4', 'rounded'],
        id: 'toggle_all',
        on: {
          change: (e) => {
            const checked = e.target.checked;
            state.list.forEach((item) => {
              item.checked = checked;
            });
          }
        }
      }, {
        tagName: 'label',
        classList: ['font-medium', 'dark:text-white'],
        attributes: {
          for: 'toggle_all'
        },
        textContent: () => l10n.t('todo.mark_all')
      }]
    }, {
      tagName: 'span',
      classList: ['isolate', 'inline-flex', 'rounded-md', 'shadow-sm'],
      children: () => {
        return ['all', 'active', 'completed'].map((item) => {
          return {
            tagName: 'a',
            href: `#${router.path}?filter=${item}`,
            classList: () => {
              const filter = router.params.$filter;
              const active = (!filter && item === 'all') || filter === item;
              return ['first:rounded-l-md', 'last:rounded-r-md', 'px-3', 'py-2', 'text-sm',
                'font-semibold', 'ring-1', 'ring-inset', 'ring-gray-300', 'hover:bg-gray-200',
                'dark:text-white', 'dark:hover:bg-gray-600',
                active && 'bg-gray-200', active && 'dark:bg-gray-600'];
            },
            textContent: () => l10n.t(`todo.filter.${item}`)
          };
        });
      }
    }, {
      tagName: 'ul',
      classList: ['mt-4', 'divide-y', 'divide-gray-200', 'border-b', 'border-t', 'border-gray-200'],
      children: () => {
        const filter = router.params.$filter;
        return state.list.$$each(item => {
          if (filter && filter !== 'all') {
            if (item.checked && filter !== 'completed') return;
            if (!item.checked && filter !== 'active') return;
          }
          return {
            tagName: 'li',
            classList: ['flex', 'gap-x-3', 'items-center', 'py-2', 'dark:text-white'],
            children: [{
              tagName: 'input',
              type: 'checkbox',
              classList: ['h-4', 'w-4', 'rounded'],
              checked: () => item.$checked,
              on: {
                change: (e) => {
                  item.checked = e.target.checked;
                }
              }
            }, {
              classList: ['flex-1'],
              children: () => {
                return item.$editable
                  ? {
                    tagName: 'input',
                    type: 'text',
                    classList: ['rounded-md', 'w-full', 'border-0', 'px-3', 'py-1.5',
                      'text-gray-900', 'ring-1', 'ring-inset', 'ring-gray-400',
                      'focus:ring-indigo-400', 'outline-0'],
                    value: item.text,
                    on: {
                      mounted: (e) => {
                        e.target.focus();
                      },
                      input: (e) => {
                        item.text = e.target.value;
                      },
                      blur: () => {
                        item.editable = false;
                      },
                      keydown: (e) => {
                        if (e.keyCode === 13) {
                          e.preventDefault();
                          item.editable = false;
                        }
                      }
                    }
                  }
                  : {
                    tagName: 'label',
                    classList: () => {
                      return item.$checked ? 'line-through' : 'no-underline';
                    },
                    textContent: () => item.text,
                    on: {
                      dblclick: () => {
                        item.editable = true;
                      }
                    }
                  };
              }
            }, {
              tagName: 'a',
              href: '#',
              on: {
                click: (e) => {
                  e.preventDefault();
                  const index = state.list.indexOf(item);
                  state.list.splice(index, 1);
                }
              },
              children: {
                view: circleXmarkIcon,
                classList: ['w-4', 'h-4', 'hover:text-red-500']
              }
            }]
          };
        });
      }
    }, {
      classList: ['my-5', 'font-semibold', 'dark:text-white'],
      textContent: () => l10n.t('todo.total', { count: state.list.$length })
    }]
  };
}
