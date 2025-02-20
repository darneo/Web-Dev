import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, NgIf, ProductListComponent],
  template: `
    <div class="container">
      <aside class="sidebar" [class.collapsed]="isSidebarCollapsed">
        <h1>Ds Store</h1>
        <ul>
          <li *ngFor="let category of categories" 
              (click)="toggleSubcategories(category)"
              [class.active]="category.name === selectedSubcategory">
            {{ category.name }}
            <ul *ngIf="category.expanded" class="subcategories">
              <li *ngFor="let sub of category.subcategories" 
                  (click)="selectSubcategory(sub, $event)">
                {{ sub }}
              </li>
            </ul>
          </li>
        </ul>
      </aside>
      <main class="content">
      <app-product-list [products]="selectedSubcategory === 'all' ? allProducts : objects[selectedSubcategory]"></app-product-list>
      </main>
    </div>
  `,
  styles: `
    .container { display: flex; height: 100vh; }
    .sidebar {
      width: 320px;
      background: #8B0000;
      color: white;
      padding: 30px;
      transition: transform 0.3s;
    }
    .sidebar.collapsed { transform: translateX(-100%); }
    .sidebar ul { list-style: none; padding: 0; }
    .sidebar li {
      padding: 15px;
      font-size: 18px;
      cursor: pointer;
      transition: background 0.3s;
    }
    .sidebar li.active { background: #A52A2A; font-weight: bold; }
    .sidebar li:hover { background: #B22222; }
    .subcategories { list-style: none; padding-left: 20px; margin-top: 10px; }
    .subcategories li {
      padding: 10px;
      font-size: 16px;
      background: #B22222;
      margin-top: 5px;
      border-radius: 5px;
    }
    .subcategories li:hover { background: #A52A2A; }
    .content { flex: 1; padding: 30px; }
  `
})
export class AppComponent {
  categories = [
    { name: 'Электроника', subcategories: ['Все товары', 'Смартфоны', 'Наушники', 'Смарт-часы', 'Ноутбуки'], expanded: false },
  ];
  
  selectedCategory: string | null = 'Все товары';
  selectedSubcategory: string = 'all';  // Изначально показываем все товары
  isSidebarCollapsed = false;

  toggleSubcategories(category: any) {
    category.expanded = !category.expanded;
  }

  selectSubcategory(subcategory: string, event: Event) {
    event.stopPropagation();
    this.selectedSubcategory = this.getKey(subcategory);
    this.selectedCategory = subcategory;
  }

  trackByName(index: number, item: any): string {
    return item.name;
  }

  getKey(subcategory: string): string {
    const map: { [key: string]: string } = {
      'Все товары': 'all',
      'Смартфоны': 'smartphones',
      'Наушники': 'headphones',
      'Смарт-часы': 'smartclocks',
      'Ноутбуки': 'notebooks'
    };
    return map[subcategory] || subcategory.toLowerCase();
  }

  objects: { [key: string]: { name: string; price: string; image: string; likes: number; }[] } = {
    smartphones: [
      { name: "Apple iPhone 13 128Gb черный", price: "276 885 ₸", image: "https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg?format=preview-large", likes: 3198 },
      { name: "Xiaomi Redmi 13C 8 ГБ/256 ГБ черный", price: "45 747 ₸", image: "https://resources.cdn-kaspi.kz/img/m/p/h1b/h77/84526902706206.jpg?format=preview-large", likes: 2534 },
    ],
    smartclocks: [
      { name: "Apple Watch SE 40 мм", price: "119 612 ₸", image: "https://resources.cdn-kaspi.kz/img/m/p/p55/p9b/5542335.png?format=preview-large", likes: 68 },
    ],
    headphones: [
      { name: "Apple AirPods 3 белый", price: "67 560 ₸", image: "https://resources.cdn-kaspi.kz/img/m/p/h31/hd7/64362668556318.jpg?format=preview-large", likes: 1342 },
    ],
    notebooks: [
      { name: "Apple MacBook Air 13", price: "495 694 ₸", image: "https://resources.cdn-kaspi.kz/img/m/p/hf4/h52/64509322919966.jpg?format=preview-large", likes: 371 },
    ]
  };

  // Создаем объединенный список всех товаров
  get allProducts() {
    return Object.values(this.objects).flat();
  }
}
