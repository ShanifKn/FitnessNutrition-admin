import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantDialogComponentComponent } from './variant-dialog-component.component';

describe('VariantDialogComponentComponent', () => {
  let component: VariantDialogComponentComponent;
  let fixture: ComponentFixture<VariantDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariantDialogComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariantDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
