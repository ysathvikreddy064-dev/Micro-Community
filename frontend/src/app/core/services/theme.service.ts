import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  dark = false;

  constructor() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      this.enableDark();
    } else {
      this.enableLight();
    }
  }

  toggle() {
    this.dark ? this.enableLight() : this.enableDark();
  }

  enableDark() {
    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
    this.dark = true;
  }

  enableLight() {
    document.body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
    this.dark = false;
  }
}
