import l10n from '../l10n';

export default function () {
  return {
    tagName: 'section',
    classList: [
      'bg-white',
      'dark:bg-gray-900'
    ],
    children: [{
      classList: [
        'py-2',
        'px-4',
        'mx-auto',
        'max-w-screen-xl',
        'lg:py-16',
        'lg:px-6'
      ],
      children: [{
        classList: [
          'mx-auto',
          'max-w-screen-sm',
          'text-center'
        ],
        children: [{
          tagName: 'h1',
          classList: [
            'mb-4',
            'text-7xl',
            'tracking-tight',
            'font-extrabold',
            'lg:text-9xl',
            'text-indigo-600',
            'dark:text-indigo-500'
          ],
          textContent: () => l10n.t('notfound.code')
        }, {
          tagName: 'p',
          classList: [
            'mb-4',
            'text-3xl',
            'tracking-tight',
            'font-bold',
            'text-gray-900',
            'md:text-4xl',
            'dark:text-white'
          ],
          textContent: () => l10n.t('notfound.message')
        }, {
          tagName: 'p',
          classList: [
            'mb-4',
            'text-lg',
            'font-light',
            'text-gray-500',
            'dark:text-gray-400'
          ],
          textContent: () => l10n.t('notfound.description')
        }, {
          tagName: 'a',
          href: '#',
          classList: [
            'inline-flex',
            'text-white',
            'bg-indigo-600',
            'hover:bg-indigo-800',
            'focus:ring-4',
            'focus:outline-none',
            'focus:ring-indigo-300',
            'font-medium',
            'rounded-lg',
            'text-sm',
            'px-5',
            'py-2.5',
            'text-center',
            'dark:focus:ring-indigo-900',
            'my-4'
          ],
          textContent: () => l10n.t('notfound.back')
        }]
      }]
    }]
  };
}
