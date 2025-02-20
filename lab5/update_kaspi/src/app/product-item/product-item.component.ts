import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-item',
  template: `
    <div class="product-card">
      <div class="image-container">
        <img [src]="product.image" alt="{{ product.name }}">
      </div>
      <h3>{{ product.name }}</h3>
      <p class="price">{{ product.price }}</p>
      <p>❤️ {{ product.likes }}</p>
      <button [class.liked]="liked" (click)="toggleLike()">
        {{ liked ? '👎 Убрать лайк' : '👍 Лайк' }}
      </button>
      <button class="delete" (click)="removeProduct()">🗑 Удалить</button>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-wrap: wrap; /* Позволяет карточкам переноситься вниз */
      justify-content: center;
      gap: 20px; /* Расстояние между карточками */
    }

    .product-card {
      width: 350px; /* Увеличенная ширина */
      height: 500px; /* Увеличенная высота */
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border-radius: 12px;
      background: white;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
      transition: transform 0.3s;
      text-align: center;
    }
    .product-card:hover {
      transform: scale(1.05);
    }
    .image-container {
      width: 100%;
      height: 250px; /* Увеличил высоту */
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    h3 {
      font-size: 20px;
      margin: 10px 0;
    }
    .price {
      font-size: 18px;
      font-weight: bold;
      color: #2d7d32;
    }
    p {
      font-size: 16px;
      margin: 5px 0;
    }
    button {
      margin: 6px;
      padding: 12px 18px;
      border: none;
      cursor: pointer;
      border-radius: 6px;
      font-size: 16px;
      transition: 0.3s;
    }
    button.liked {
      background-color: #cc0000;
      color: white;
    }
    button:not(.liked) {
      background-color: #4CAF50;
      color: white;
    }
    button.delete {
      background-color: #f44336;
    }
  `
})
export class ProductItemComponent {
  @Input() product!: { name: string; price: string; image: string; likes: number };
  @Output() like = new EventEmitter<boolean>();
  @Output() remove = new EventEmitter<void>();

  liked = false;

  toggleLike() {
    this.liked = !this.liked;
    this.like.emit(this.liked);
  }

  removeProduct() {
    this.remove.emit();
  }
}
