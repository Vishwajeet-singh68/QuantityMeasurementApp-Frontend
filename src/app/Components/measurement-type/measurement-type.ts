import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../shared/card/card';
import { OperationComponent } from '../operation/operation';

@Component({
  selector: 'app-measurement-type',
  standalone: true,
  imports: [CommonModule, CardComponent, OperationComponent],
  templateUrl: './measurement-type.html',
  styleUrls: ['./measurement-type.css']
})
export class MeasurementTypeComponent {

  selectedType = 'LengthUnit';

  measurementCards = [
    { title: 'Length', emoji: '📏', type: 'LengthUnit' },
    { title: 'Temperature', emoji: '🌡️', type: 'TemperatureUnit' },
    { title: 'Volume', emoji: '🧪', type: 'VolumeUnit' },
    { title: 'Weight', emoji: '⚖️', type: 'WeightUnit' }
  ];

  selectType(type: string) {
    this.selectedType = type;
  }
}