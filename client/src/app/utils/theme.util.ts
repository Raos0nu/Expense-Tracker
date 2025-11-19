export class ThemeService {
  private static readonly THEME_KEY = 'expense-tracker-theme';
  private static readonly DARK_THEME = 'dark';
  private static readonly LIGHT_THEME = 'light';

  static getTheme(): string {
    return localStorage.getItem(this.THEME_KEY) || this.LIGHT_THEME;
  }

  static setTheme(theme: string): void {
    localStorage.setItem(this.THEME_KEY, theme);
    this.applyTheme(theme);
  }

  static toggleTheme(): string {
    const currentTheme = this.getTheme();
    const newTheme = currentTheme === this.DARK_THEME ? this.LIGHT_THEME : this.DARK_THEME;
    this.setTheme(newTheme);
    return newTheme;
  }

  static applyTheme(theme: string): void {
    const body = document.body;
    if (theme === this.DARK_THEME) {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  }

  static initTheme(): void {
    this.applyTheme(this.getTheme());
  }
}

