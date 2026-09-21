import {
  Component,
  ChangeDetectionStrategy,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';

export interface SizeOption {
  sizeId: number;
  name: string;
  checked: boolean;
  price: number;
}

const STORAGE_PREFIX = 'pizza-item-state-';

@Component({
  selector: 'app-pizza-item',
  standalone: true,
  templateUrl: './pizza-item.component.html',
  styleUrl: './pizza-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaItemComponent {
  itemId = input.required<number>();
  name = input.required<string>();
  initialSizes = input.required<SizeOption[]>();
  expanded = input<boolean>(false);

  toggleExpand = output<number>();

  state = signal<SizeOption[]>([]);

  private lastCheckedPrice = new Map<number, number>();

  constructor() {
    effect(() => {
      const id = this.itemId();
      const initial = this.initialSizes();
      if (initial.length === 0) return;
      const saved = this.loadFromStorage(id);
      this.state.set(saved ?? initial.map((s) => ({ ...s })));
    });

    effect(() => {
      const id = this.itemId();
      const current = this.state();
      if (current.length) {
        localStorage.setItem(STORAGE_PREFIX + id, JSON.stringify(current));
      }
    });
  }

  hasChanges = computed(() => {
    const initial = this.initialSizes();
    const current = this.state();
    return current.some(
      (s, i) =>
        s.checked !== initial[i]?.checked || s.price !== initial[i]?.price,
    );
  });

  private loadFromStorage(id: number): SizeOption[] | null {
    const raw = localStorage.getItem(STORAGE_PREFIX + id);
    return raw ? JSON.parse(raw) : null;
  }

  onHeaderClick(): void {
    this.toggleExpand.emit(this.itemId());
  }

  onCheckboxChange(sizeId: number, checked: boolean): void {
    this.state.update((sizes) =>
      sizes.map((s) => {
        if (s.sizeId !== sizeId) return s;
        if (!checked) {
          this.lastCheckedPrice.set(sizeId, s.price);
          return { ...s, checked: false, price: 0 };
        }
        const restored =
          this.lastCheckedPrice.get(sizeId) ??
          this.initialSizes().find((i) => i.sizeId === sizeId)?.price ??
          0;
        return { ...s, checked: true, price: restored };
      }),
    );
  }

  onPriceInput(sizeId: number, rawValue: string): void {
    const cleaned = rawValue.replace(/[^0-9.]/g, '');
    const value = parseFloat(cleaned);
    this.state.update((sizes) =>
      sizes.map((s) =>
        s.sizeId === sizeId ? { ...s, price: isNaN(value) ? 0 : value } : s,
      ),
    );
  }

  onUndo(): void {
    this.state.set(this.initialSizes().map((s) => ({ ...s })));
    this.lastCheckedPrice.clear();
  }
}
