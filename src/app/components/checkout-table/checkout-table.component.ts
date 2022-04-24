import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { CheckoutTable } from 'src/app/shared/utils';

@Component({
  selector: 'app-checkout-table',
  templateUrl: './checkout-table.component.html',
  styleUrls: ['./checkout-table.component.scss']
})
export class CheckoutTableComponent implements OnInit {
  @HostBinding('hidden') isHidden = true;
  @Input() count: number | null = null;
  checkoutTable = new CheckoutTable();
  nextDarts = {
    d1: '',
    d2: '',
    d3: ''
  };
  version: "v1" | "v2" | "v3" = "v1";
  constructor() { }

  ngOnInit(): void {
    this.getCheckout(this.version);
  }

  getCheckout(v: "v1" | "v2" | "v3") {
    let hasCheckoutVersion = false;
    if (this.count) {
      const arr = this.checkoutTable.get(this.count, v);
      if (arr) {
        this.isHidden = false;
        this.nextDarts.d1 = arr[0] || '';
        this.nextDarts.d2 = arr[1] || '';
        this.nextDarts.d3 = arr[2] || '';
        hasCheckoutVersion = true;
      }
    }
    return hasCheckoutVersion;
  }

  nextCheckout() {
    console.log(this.version);
    if (this.version === "v1") {
      this.version = "v2";
      const hasCheckout = this.getCheckout(this.version);
      if (!hasCheckout) {
        this.version = "v3";
        this.getCheckout(this.version);
      }
    } else if (this.version === "v2") {
      this.version = "v3";
      const hasCheckout = this.getCheckout(this.version);
      if (!hasCheckout) {
        this.version = "v1";
        this.getCheckout(this.version);
      }
    } else if (this.version === "v3") {
      this.version = "v1";
      const hasCheckout = this.getCheckout(this.version);
      if (!hasCheckout) {
        this.version = "v2";
        this.getCheckout(this.version);
      }
    }
  }
}
