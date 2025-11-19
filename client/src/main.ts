import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { ThemeService } from './app/utils/theme.util';

ThemeService.initTheme();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


