import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionOfAccountComponent } from './condition-of-account.component';

describe('ConditionOfAccountComponent', () => {
  let component: ConditionOfAccountComponent;
  let fixture: ComponentFixture<ConditionOfAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionOfAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionOfAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
