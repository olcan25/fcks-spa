import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWholeSaleOrderLineComponent } from './update-whole-sale-order-line.component';

describe('UpdateWholeSaleOrderLineComponent', () => {
  let component: UpdateWholeSaleOrderLineComponent;
  let fixture: ComponentFixture<UpdateWholeSaleOrderLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateWholeSaleOrderLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWholeSaleOrderLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
