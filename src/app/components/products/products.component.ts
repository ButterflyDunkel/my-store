import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  products: Product[] = [
    {
      id: '1',
      name:'Tulipanes',
      price: 1000,
      image: '../assets/images/tulipanes.png'
    },
    {
      id: '2',
      name:'Lirios',
      price: 200,
      image: '../assets/images/lirios.png'
    },
    {
      id: '3',
      name:'Rosas',
      price: 600,
      image: '../assets/images/rosas.png'
    },
    {
      id: '4',
      name:'Girasoles',
      price: 300,
      image: '../assets/images/girasoles.png'
    },
    {
      id: '5',
      name:'Gerberas',
      price: 250,
      image: '../assets/images/gerberas.png'
    },
    {
      id: '6',
      name:'Alcatraz',
      price: 150,
      image: '../assets/images/alcatraz.png'
    },
  ];
}
