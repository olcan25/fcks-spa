import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOfAccountComponent } from './card-of-account.component';

describe('CardOfAccountComponent', () => {
  let component: CardOfAccountComponent;
  let fixture: ComponentFixture<CardOfAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardOfAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOfAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
