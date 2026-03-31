import { Component, Input, OnChanges, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-input-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-panel.html',
  styleUrls: ['./input-panel.css'],
})
export class InputPanelComponent implements OnChanges {

  constructor(private http: HttpClient) {}

  @Input() operation!: string;
  @Input() type!: string;

  // ✅ Signals (instead of normal variables)
  value1 = signal(0);
  value2 = signal(0);
  result = signal(0);

  unit1 = signal('');
  unit2 = signal('');
  targetUnit = signal('');

  units: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['type']) {
      this.setUnits();
      this.resetValues();
    }
  }

  setUnits() {
    if (this.type === 'LengthUnit') {
      this.units = ['INCHES', 'FEET', 'YARD', 'CENTIMETRE'];
    } 
    else if (this.type === 'TemperatureUnit') {
      this.units = ['CELSIUS', 'FAHRENHEIT', 'KELVIN'];
    } 
    else if (this.type === 'VolumeUnit') {
      this.units = ['LITER', 'GALLON', 'MILLILITER'];
    } 
    else if (this.type === 'WeightUnit') {
      this.units = ['GRAMS', 'KILOGRAMS', 'POUNDS'];
    } 
    else {
      this.units = [];
    }

    this.unit1.set(this.units[0] || '');
    this.unit2.set(this.units[1] || this.units[0] || '');
    this.targetUnit.set(this.units[0] || '');
  }

  resetValues() {
    this.value1.set(0);
    this.value2.set(0);
    this.result.set(0);
  }

  createRequestJson() {
    return {
      thisQuantityDTO: {
        value: this.value1(),
        unit: this.unit1(),
        measurementType: this.type
      },
      targetQuantityDTO: {
        value: 0.0,
        unit: this.targetUnit(),
        measurementType: this.type
      },
      ...(this.operation !== 'conversion' && {
        thatQuantityDTO: {
          value: this.value2(),
          unit: this.unit2(),
          measurementType: this.type
        }
      })
    };
  }

  sendData() {
    const payload = this.createRequestJson();
    const token = localStorage.getItem('token');

    console.log("Token:", token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    console.log("Sending:", payload);

    this.http.post<any>(
      `http://ec2-13-233-198-26.ap-south-1.compute.amazonaws.com:8080/api/quantities/${this.operation}`,
      payload,
      { headers }   // 👈 add this
    ).subscribe({
      next: (res) => {
        console.log("Response:", res);

        this.result.set(res?.resultValue ?? 0);
        this.targetUnit.set(res?.resultUnit ?? this.targetUnit());
      },
      error: (err) => {
        console.error("Error:", err);
      }
    });
  }
}