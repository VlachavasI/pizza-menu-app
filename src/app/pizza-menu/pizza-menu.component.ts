import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import {
  PizzaItemComponent,
  SizeOption,
} from '../pizza-item/pizza-item.component';
import { items, itemSizes, itemPrices } from '../data';

interface MenuItem {
  itemId: number;
  name: string;
  sizes: SizeOption[];
}

@Component({
  selector: 'app-pizza-menu',
  standalone: true,
  imports: [PizzaItemComponent],
  templateUrl: './pizza-menu.component.html',
  styleUrl: './pizza-menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaMenuComponent {
  menuItems: MenuItem[] = items.map((item) => ({
    itemId: item.itemId,
    name: item.name,
    sizes: itemSizes.map((size) => ({
      sizeId: size.sizeId,
      name: size.name,
      checked: true,
      price:
        itemPrices.find(
          (p) => p.itemId === item.itemId && p.sizeId === size.sizeId,
        )?.price ?? 0,
    })),
  }));

  expandedItemId = signal<number | null>(null);

  onToggleExpand(itemId: number): void {
    this.expandedItemId.update((current) =>
      current === itemId ? null : itemId,
    );
  }
}