import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewItemTableComponent } from './admin-view-item-table.component';

describe('AdminViewItemTableComponent', () => {
  let component: AdminViewItemTableComponent;
  let fixture: ComponentFixture<AdminViewItemTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminViewItemTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewItemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
