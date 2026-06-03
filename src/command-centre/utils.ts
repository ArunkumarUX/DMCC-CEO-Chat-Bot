export function kebabToPascal(name: string): string {
  return name
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

export function useIsArabic(lang: string) {
  return lang === 'ar';
}

export const TREND_ICON: Record<'up' | 'down' | 'flat', string> = {
  up: 'trending-up',
  down: 'trending-down',
  flat: 'move-right',
};
