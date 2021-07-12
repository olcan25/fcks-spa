import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePurchaseOrderLinesComponent } from './update-purchase-order-lines.component';

describe('UpdatePurchaseOrderLinesComponent', () => {
  let component: UpdatePurchaseOrderLinesComponent;
  let fixture: ComponentFixture<UpdatePurchaseOrderLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePurchaseOrderLinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePurchaseOrderLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
