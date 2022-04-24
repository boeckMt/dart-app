import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutTableComponent } from './checkout-table.component';

describe('CheckoutTableComponent', () => {
  let component: CheckoutTableComponent;
  let fixture: ComponentFixture<CheckoutTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
