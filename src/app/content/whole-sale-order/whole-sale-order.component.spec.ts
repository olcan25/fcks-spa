import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WholeSaleOrderComponent } from './whole-sale-order.component';

describe('WholeSaleOrderComponent', () => {
  let component: WholeSaleOrderComponent;
  let fixture: ComponentFixture<WholeSaleOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WholeSaleOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WholeSaleOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
