import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionOfPartnerComponent } from './condition-of-partner.component';

describe('ConditionOfPartnerComponent', () => {
  let component: ConditionOfPartnerComponent;
  let fixture: ComponentFixture<ConditionOfPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionOfPartnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionOfPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
