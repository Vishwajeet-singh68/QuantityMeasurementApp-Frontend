import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementTypeComponent } from './measurement-type';

describe('MeasurementTypeComponent', () => {
  let component: MeasurementTypeComponent;
  let fixture: ComponentFixture<MeasurementTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasurementTypeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MeasurementTypeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
