import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,              // ✅ MUST for standalone usage
  imports: [CommonModule],       // ✅ Needed for bindings
  templateUrl: './card.html',
  styleUrls: ['./card.css']
})
export class CardComponent {

  @Input() title!: string;
  @Input() emoji!: string;
  @Input() type!: string;
  @Input() selectedType!: string;

  @Output() onSelect = new EventEmitter<string>();

  selectCard() {
    this.onSelect.emit(this.type);
  }
}