import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWholeSaleOrderComponent } from './update-whole-sale-order.component';

describe('UpdateWholeSaleOrderComponent', () => {
  let component: UpdateWholeSaleOrderComponent;
  let fixture: ComponentFixture<UpdateWholeSaleOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateWholeSaleOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWholeSaleOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
