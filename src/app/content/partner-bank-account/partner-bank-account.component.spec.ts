import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerBankAccountComponent } from './partner-bank-account.component';

describe('PartnerBankAccountComponent', () => {
  let component: PartnerBankAccountComponent;
  let fixture: ComponentFixture<PartnerBankAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerBankAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
