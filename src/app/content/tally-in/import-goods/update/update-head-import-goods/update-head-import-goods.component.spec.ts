import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHeadImportGoodsComponent } from './update-head-import-goods.component';

describe('UpdateHeadImportGoodsComponent', () => {
  let component: UpdateHeadImportGoodsComponent;
  let fixture: ComponentFixture<UpdateHeadImportGoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateHeadImportGoodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateHeadImportGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
