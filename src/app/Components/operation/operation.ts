import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../shared/card/card'; // ✅ FIXED
import { InputPanelComponent } from '../input-panel/input-panel'; // ✅ FIXED

@Component({
  selector: 'app-operation',
  standalone: true,
  imports: [CommonModule, InputPanelComponent], // ✅ UPDATED
  templateUrl: './operation.html',
  styleUrls: ['./operation.css']
})
export class OperationComponent {

  selectedOperation = 'conversion';

  @Input() selectedType!: string;

  operations = [
  { title: 'Conversion', emoji: '🔄', type: 'conversion' },
  { title: 'Add', emoji: '➕', type: 'add' },
  { title: 'Subtract', emoji: '➖', type: 'subtract' },
  { title: 'Divide', emoji: '➗', type: 'divide' }
];

getDescription(type: string): string {
  switch (type) {
    case 'conversion': return 'Convert units';
    case 'add': return 'Add quantities';
    case 'subtract': return 'Subtract values';
    case 'divide': return 'Divide values';
    default: return '';
  }
}

  selectOperation(type: string) {
    this.selectedOperation = type;
  }
}