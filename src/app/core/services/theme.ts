import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, computed, effect, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

export interface ThemeOption {
  id: string;
  label: string;
  accent: string;
  accentSoft: string;
  accentStrong: string;
}

const STORAGE_KEY = 'agency-ui-theme';
const MODE_KEY = 'agency-ui-mode';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly themes: ThemeOption[] = [
    { id: 'atelier', label: 'Atelier', accent: '#1d4ed8', accentSoft: '#dbeafe', accentStrong: '#1e3a8a' },
    { id: 'sage', label: 'Sage', accent: '#0f766e', accentSoft: '#ccfbf1', accentStrong: '#115e59' },
    { id: 'ember', label: 'Ember', accent: '#c2410c', accentSoft: '#ffedd5', accentStrong: '#9a3412' },
  ];

  readonly mode = signal<ThemeMode>('light');
  readonly themeId = signal(this.themes[0].id);
  readonly activeTheme = computed(
    () => this.themes.find((theme) => theme.id === this.themeId()) ?? this.themes[0]
  );
  readonly themeOptions = computed(() =>
    this.themes.map((theme) => ({ label: theme.label, value: theme.id }))
  );

  private initialized = false;

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    effect(() => {
      if (!this.initialized) {
        return;
      }

      this.applyTheme();
      localStorage.setItem(STORAGE_KEY, this.themeId());
      localStorage.setItem(MODE_KEY, this.mode());
    });
  }

  init(): void {
    if (this.initialized) {
      return;
    }

    const storedTheme = localStorage.getItem(STORAGE_KEY);
    const storedMode = localStorage.getItem(MODE_KEY) as ThemeMode | null;

    if (storedTheme && this.themes.some((theme) => theme.id === storedTheme)) {
      this.themeId.set(storedTheme);
    }

    if (storedMode === 'light' || storedMode === 'dark') {
      this.mode.set(storedMode);
    }

    this.initialized = true;
    this.applyTheme();
  }

  setTheme(themeId: string): void {
    if (this.themes.some((theme) => theme.id === themeId)) {
      this.themeId.set(themeId);
    }
  }

  toggleMode(): void {
    this.mode.update((mode) => (mode === 'light' ? 'dark' : 'light'));
  }

  private applyTheme(): void {
    const theme = this.activeTheme();
    const mode = this.mode();
    const root = this.document.documentElement;

    root.dataset['theme'] = theme.id;
    root.dataset['mode'] = mode;
    root.style.setProperty('--theme-accent', theme.accent);
    root.style.setProperty('--theme-accent-soft', theme.accentSoft);
    root.style.setProperty('--theme-accent-strong', theme.accentStrong);
  }
}
