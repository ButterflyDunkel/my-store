import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  activeMenu = false;

  constructor(private storeService: StoreService) {}

  numberProduct() {
    return this.storeService.getShoppingCart().length;
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }
}
