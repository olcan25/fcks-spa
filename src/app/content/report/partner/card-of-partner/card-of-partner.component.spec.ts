import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOfPartnerComponent } from './card-of-partner.component';

describe('CardOfPartnerComponent', () => {
  let component: CardOfPartnerComponent;
  let fixture: ComponentFixture<CardOfPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardOfPartnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOfPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
