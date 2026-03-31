import { Component } from '@angular/core';
import { Navbar } from '../../Components/navbar/navbar';
import { MeasurementTypeComponent } from '../../Components/measurement-type/measurement-type';
import { HistorySidebarComponent } from '../../Components/history-sidebar/history-sidebar';


@Component({
  selector: 'app-quantity-app',
  imports: [Navbar, MeasurementTypeComponent],
  templateUrl: './quantity-app.html',
  styleUrl: './quantity-app.css',
})
export class QuantityApp {}
