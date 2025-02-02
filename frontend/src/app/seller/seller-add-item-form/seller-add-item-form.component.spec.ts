import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAddItemFormComponent } from './seller-add-item-form.component';

describe('SellerAddItemFormComponent', () => {
  let component: SellerAddItemFormComponent;
  let fixture: ComponentFixture<SellerAddItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerAddItemFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerAddItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
