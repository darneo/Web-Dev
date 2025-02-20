import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, NgIf, ProductItemComponent],
  template: `
    <div *ngIf="products?.length; else noProducts">
      <h2>{{ categoryName }}</h2>
      <div class="product-grid">
        <app-product-item 
          *ngFor="let product of products; let i = index; trackBy: trackByProduct" 
          [product]="product"
          (like)="increaseLikes(i)"
          (remove)="removeProduct(i)">
        </app-product-item>
      </div>
    </div>
    <ng-template #noProducts>
      <p>Нет товаров в этой категории</p>
    </ng-template>
  `,
  styles: `
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
    }
  `
})
export class ProductListComponent {
  @Input() products: any[] = [];
  @Input() categoryName: string = '';

  trackByProduct(index: number, product: any): string {
    return product.name;
  }

  increaseLikes(index: number) {
    this.products[index].likes++;
  }

  removeProduct(index: number) {
    this.products.splice(index, 1);
  }
}
