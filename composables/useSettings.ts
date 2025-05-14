import sortOptions from "~/content/sortOptions.json";
import type { iSettings } from "~/components/settings/settings.types";

export default function useSettings() {
  const settings = useCookie<iSettings>('settings');

  const isDarkSystem = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches
    ? 'dark'
    : 'light';
  const theme = computed(() => settings.value?.theme);

  settings.value = {
    ...settings.value,
    theme: theme.value ?? 'system',
    sortOption: settings.value.sortOption ?? sortOptions.at(0)
  };
  const selectedTheme = computed(() =>
    theme.value === 'system' ? isDarkSystem : theme.value
  );

  return { selectedTheme, ...settings.value };
}
