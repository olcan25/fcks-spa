import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHeadImportGoodsComponent } from './create-head-import-goods.component';

describe('CreateHeadImportGoodsComponent', () => {
  let component: CreateHeadImportGoodsComponent;
  let fixture: ComponentFixture<CreateHeadImportGoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateHeadImportGoodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHeadImportGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
