import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboProductComponent } from './combo-product.component';

describe('ComboProductComponent', () => {
  let component: ComboProductComponent;
  let fixture: ComponentFixture<ComboProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComboProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComboProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
