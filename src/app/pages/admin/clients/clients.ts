import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { Client, ClientModel } from '../../../core/services/client';

@Component({
  selector: 'app-clients',
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, 
    DialogModule, InputTextModule, ToolbarModule],
  templateUrl: './clients.html',
  styleUrl: './clients.scss',
})
export class Clients implements OnInit {
  clients: ClientModel[] = [];
  loading: boolean = true;
  
  clientDialog: boolean = false;
  currentClient: ClientModel = { businessName: '' };

  constructor(private clientService: Client) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.loading = true;
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load clients', err);
        this.loading = false;
      }
    });
  }

  openNew() {
    this.currentClient = { businessName: '' };
    this.clientDialog = true;
  }

  hideDialog() {
    this.clientDialog = false;
  }

  saveClient() {
    if (this.currentClient.businessName.trim()) {
      this.clientService.createClient(this.currentClient).subscribe({
        next: () => {
          this.loadClients(); // Reload the table
          this.hideDialog();
        },
        error: (err) => console.error('Failed to save client', err)
      });
    }
  }
}
