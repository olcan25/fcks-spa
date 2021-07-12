import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitofmeasureComponent } from './unitofmeasure.component';

describe('UnitofmeasureComponent', () => {
  let component: UnitofmeasureComponent;
  let fixture: ComponentFixture<UnitofmeasureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitofmeasureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitofmeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
