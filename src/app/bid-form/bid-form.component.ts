import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-bid-form',
  templateUrl: './bid-form.component.html',
  styleUrls: ['./bid-form.component.scss']
})
export class BidFormComponent implements OnInit {

  @Input() productId: string;
  @Input() currentValue: number;
  @Output() closeForm = new EventEmitter();
  form: FormGroup;

  constructor(private db: AngularFireDatabase, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      amount: ['', [Validators.required, this.amountValidator()]]
    })
  }

  amountValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const regex = /^\d+0$/;
      const forbidden = (+control.value <= this.currentValue && this.currentValue > 10) || !regex.test(control.value);
      return forbidden ? {'forbiddenName': {value: control.value}} : null;
    };
  }

  onSubmitBid(): void {
    const product = {
      currentPrice: +this.form.get('amount').value,
      leadBidder: this.form.get('name').value
    };
    this.db.object('products/' + this.productId).update(product);
    this.form.reset();
    this.closeForm.emit();
  }

  onCancel() {
    this.form.reset();
    this.closeForm.emit();
  }

}
