import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietaryComponent } from './dietary.component';

describe('DietaryComponent', () => {
  let component: DietaryComponent;
  let fixture: ComponentFixture<DietaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DietaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DietaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
