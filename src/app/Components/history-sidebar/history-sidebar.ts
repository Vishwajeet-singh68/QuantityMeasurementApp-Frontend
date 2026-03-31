import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-history-sidebar',
  templateUrl: './history-sidebar.html',
  imports: [CommonModule,Navbar],
  styleUrls: ['./history-sidebar.css']
})
export class HistorySidebarComponent implements OnInit {

  operations = [
    { title: 'Convert', emoji: '🔄', type: 'CONVERT' },
    { title: 'Add', emoji: '➕', type: 'ADD' },
    { title: 'Subtract', emoji: '➖', type: 'SUBTRACT' },
    { title: 'Divide', emoji: '➗', type: 'DIVIDE' }
  ];

  selectedOperation = 'CONVERT';
  history = signal<any[]>([]);
  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadHistory();
  }

  selectOperation(op: string) {
    this.selectedOperation = op;
    this.loadHistory();
  }

  loadHistory() {
    const token = localStorage.getItem('token');

    console.log("Token:", token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.loading = true;

    this.http.get<any[]>(
      `http://ec2-13-233-198-26.ap-south-1.compute.amazonaws.com:8080/api/quantities/history/operation/${this.selectedOperation}`,{ headers }
    ).subscribe({
      next: (res) => this.history.set(res),
      error: (err) => console.error(err),
      complete: () => this.loading = false
    });
  }
}