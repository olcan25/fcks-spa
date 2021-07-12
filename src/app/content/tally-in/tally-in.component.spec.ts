import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallyInComponent } from './tally-in.component';

describe('TallyInComponent', () => {
  let component: TallyInComponent;
  let fixture: ComponentFixture<TallyInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TallyInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TallyInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
