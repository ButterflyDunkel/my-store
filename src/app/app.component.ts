import { Component } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;


  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }
}
