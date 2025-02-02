import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerViewItemComponent } from './seller-view-item.component';

describe('SellerViewItemComponent', () => {
  let component: SellerViewItemComponent;
  let fixture: ComponentFixture<SellerViewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerViewItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerViewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
