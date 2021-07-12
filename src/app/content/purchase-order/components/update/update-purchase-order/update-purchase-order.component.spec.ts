import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePurchaseOrderComponent } from './update-purchase-order.component';

describe('UpdatePurchaseOrderComponent', () => {
  let component: UpdatePurchaseOrderComponent;
  let fixture: ComponentFixture<UpdatePurchaseOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePurchaseOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
