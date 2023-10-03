import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Product, CreateProductDTO, UpdateProductDTO } from '../../../models/product.model';

import { StoreService } from '../../../services/store.service';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent  {

  @Input() products: Product[] = [];
  //@Input() productId: string | null = null;
  @Input()
  set productId(id: string | null){
    if(id){
      this.onShowDetail(id);
    }
  }
  @Output() loadMore = new EventEmitter();

  myShoppingCart: Product[] = [];
  total = 0;
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
    },
    description: ''
  };
  statusDetail: 'loading' | 'success' | 'error' | 'init' = "init";

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    if(!this.showProductDetail){
      this.showProductDetail = true;
      }
    //this.toggleProductDetail();
    this.productsService.getOneProduct(id)
    .subscribe(data => {
      this.productChosen = data;
      this.statusDetail = 'success';
    }, errorMsg => {
      window.alert(errorMsg);
      this.statusDetail = 'error';
    });
  }

//  readAndUpdate(id: string){
//   this.productsService.getProduct(id)
//    .pipe(
//      switchMap((product) =>  this.productsService.update(product.id, {title: 'change'}))
//    )
//    .subscribe(data => {
//      console.log(data);
//    });
//    this.productsService.fetchReadAndUpdate(id, {title: 'change'})
//    .subscribe(response => {
//      const read = response[0];
//      const update = response[1];
//    })
//  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo producto',
      description: 'bla bla bla',
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      price: 1000,
      categoryId: 2,
    }
    this.productsService.create(product)
    .subscribe(data => {
      this.products.unshift(data);
    });
  }

  updateProduct(){
    const changes: UpdateProductDTO = {
      title: 'New Title',
    }
    const id = this.productChosen?.id;
    this.productsService.update(id,changes)
    .subscribe(data => {
      //console.log('Updated:', data);
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
      this.productChosen = data;
    })
  }

  deleteProduct(){
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    })
  }

  onLoadMore(){
    this.loadMore.emit();
  }

}
