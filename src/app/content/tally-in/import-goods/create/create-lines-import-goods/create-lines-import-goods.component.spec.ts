import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLinesImportGoodsComponent } from './create-lines-import-goods.component';

describe('CreateLinesImportGoodsComponent', () => {
  let component: CreateLinesImportGoodsComponent;
  let fixture: ComponentFixture<CreateLinesImportGoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLinesImportGoodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLinesImportGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
