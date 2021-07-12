import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOfProductComponent } from './card-of-product.component';

describe('CardOfProductComponent', () => {
  let component: CardOfProductComponent;
  let fixture: ComponentFixture<CardOfProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardOfProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOfProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
