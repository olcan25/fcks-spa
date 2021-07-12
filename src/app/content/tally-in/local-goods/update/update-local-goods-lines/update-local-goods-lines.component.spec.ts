import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLocalGoodsLinesComponent } from './update-local-goods-lines.component';

describe('UpdateLocalGoodsLinesComponent', () => {
  let component: UpdateLocalGoodsLinesComponent;
  let fixture: ComponentFixture<UpdateLocalGoodsLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLocalGoodsLinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLocalGoodsLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
