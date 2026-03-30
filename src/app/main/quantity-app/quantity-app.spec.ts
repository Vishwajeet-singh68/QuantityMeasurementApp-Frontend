import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityApp } from './quantity-app';

describe('QuantityApp', () => {
  let component: QuantityApp;
  let fixture: ComponentFixture<QuantityApp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantityApp],
    }).compileComponents();

    fixture = TestBed.createComponent(QuantityApp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
