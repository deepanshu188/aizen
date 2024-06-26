export default function useTheme() {
  const settings: { value: { theme: string } } =
    <iSettings>useCookie('settings');
  const isDarkSystem = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches
    ? 'dark'
    : 'light';
  const theme = computed(() => settings.value?.theme);

  settings.value = {
    ...settings.value,
    theme: theme.value ?? 'system',
  };
  const selectedTheme = computed(() =>
    theme.value === 'system' ? isDarkSystem : theme.value
  );

  return selectedTheme;
}
