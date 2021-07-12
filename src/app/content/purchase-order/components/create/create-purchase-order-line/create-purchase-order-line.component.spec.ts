import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePurchaseOrderLineComponent } from './create-purchase-order-line.component';

describe('CreatePurchaseOrderLineComponent', () => {
  let component: CreatePurchaseOrderLineComponent;
  let fixture: ComponentFixture<CreatePurchaseOrderLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePurchaseOrderLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePurchaseOrderLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
