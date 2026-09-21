import { Component } from '@angular/core';
import { PizzaMenuComponent } from './pizza-menu/pizza-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PizzaMenuComponent],
  template: `<app-pizza-menu />`,
})
export class AppComponent {}