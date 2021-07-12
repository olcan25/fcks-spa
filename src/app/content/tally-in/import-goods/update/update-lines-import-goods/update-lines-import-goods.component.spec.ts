import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLinesImportGoodsComponent } from './update-lines-import-goods.component';

describe('UpdateLinesImportGoodsComponent', () => {
  let component: UpdateLinesImportGoodsComponent;
  let fixture: ComponentFixture<UpdateLinesImportGoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLinesImportGoodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLinesImportGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
