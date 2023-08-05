import l10n from '../l10n';

export default function () {
  return {
    classList: ['grid', 'min-h-full', 'place-items-center', 'bg-white',
      'px-6', 'py-24', 'sm:py-32', 'lg:px-8'],
    children: [{
      classList: ['text-center'],
      children: [{
        tagName: 'p',
        classList: ['text-base', 'font-semibold', 'text-indigo-600'],
        textContent: () => l10n.t('notfound.code')
      }, {
        tagName: 'h1',
        classList: ['mt-4', 'text-3xl', 'font-bold', 'tracking-tight', 'text-gray-900', 'sm:text-5xl'],
        textContent: () => l10n.t('notfound.message')
      }, {
        tagName: 'p',
        classList: ['mt-6', 'text-base', 'leading-7', 'text-gray-600'],
        textContent: () => l10n.t('notfound.description')
      }, {
        classList: ['mt-10', 'flex', 'items-center', 'justify-center', 'gap-x-6'],
        children: [{
          tagName: 'a',
          href: '#',
          classList: ['rounded-md', 'bg-indigo-600', 'px-3.5', 'py-2.5', 'text-sm', 'font-semibold',
            'text-white', 'shadow-sm', 'hover:bg-indigo-500', 'focus-visible:outline',
            'focus-visible:outline-2', 'focus-visible:outline-offset-2', 'focus-visible:outline-indigo-600'],
          textContent: () => l10n.t('notfound.back')
        }]
      }]
    }]
  };
}
