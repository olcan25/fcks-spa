import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLocalGoodsHeadComponent } from './update-local-goods-head.component';

describe('UpdateLocalGoodsHeadComponent', () => {
  let component: UpdateLocalGoodsHeadComponent;
  let fixture: ComponentFixture<UpdateLocalGoodsHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLocalGoodsHeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLocalGoodsHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
