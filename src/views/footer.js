import l10n from '../l10n';

export default function () {
  return {
    tagName: 'footer',
    children: [{
      classList: ['text-sm', 'text-gray-500', 'text-center', 'border-t-2', 'py-4'],
      textContent: () => l10n.t('footer.text')
    }]
  };
}
