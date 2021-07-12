import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionOfProductComponent } from './condition-of-product.component';

describe('ConditionOfProductComponent', () => {
  let component: ConditionOfProductComponent;
  let fixture: ComponentFixture<ConditionOfProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionOfProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionOfProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
