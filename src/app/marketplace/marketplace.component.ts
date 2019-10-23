import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../model/product";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import {Subscription} from "rxjs/index";

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnInit, OnDestroy {

  newProductForm: FormGroup;
  products: AngularFireList<any>;
  productList: Product[];
  productSubscription: Subscription;
  activeForm: string;
  loading = false;
  biddingClosed: boolean;

  constructor(private fb: FormBuilder, private db: AngularFireDatabase) {
    this.newProductForm = this.fb.group({
      sellerName: ['', Validators.required],
      productName: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.loading = true;
    this.setCountdownTimer();
    this.products = this.db.list('/products');
    this.productSubscription = this.db.list('/products').valueChanges()
      .subscribe(data => {
        this.productList = data as Product[];
        console.log(this.productList);
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }

  onSubmitNewProductForm() {
    const product = new Product();
    product.sellerName = this.newProductForm.get('sellerName').value.trim();
    product.description = this.newProductForm.get('description').value.trim();
    product.productName = this.newProductForm.get('productName').value.trim();
    product.currentPrice = 10;
    product.id = this.calculateNextProductId();
    this.db.object('products/' + product.id).update(product);

    this.newProductForm.reset();
  }

  onCancelNewProductForm() {
    this.newProductForm.reset();
  }

  calculateNextProductId(): string {
    const currentMax = Math.max(...this.productList.map(product => +product.id), 0);
    return (currentMax + 1).toString();
  }

  setCountdownTimer() {
    const x = setInterval(() => {

      const countDownDate = new Date("Nov 14, 2019 12:00:00").getTime();
      const now = new Date().getTime();

      const distance = countDownDate - now;

      if (distance <= 0) {this.biddingClosed = true;
      clearInterval(x)}
    }, 1000);
  }

}
