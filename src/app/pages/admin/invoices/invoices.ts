import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { CreateInvoiceRequest, Invoice, InvoiceItemDto } from '../../../core/services/invoice';
import { Client, ClientModel } from '../../../core/services/client';

@Component({
  selector: 'app-invoices',
  imports: [CommonModule, FormsModule, ButtonModule, SelectModule, 
    DatePickerModule, InputTextModule, InputNumberModule, 
    InputTextModule, TableModule, TextareaModule],
  templateUrl: './invoices.html',
  styleUrl: './invoices.scss',
})
export class Invoices implements OnInit{
  clients: ClientModel[] = [];
  selectedClient: ClientModel | null = null;
  issueDate: Date = new Date();
  dueDate: Date = new Date(new Date().setDate(new Date().getDate() + 14)); // Default to 14 days from now
  notes: string = 'Thank you for your business!';
  
  // Dynamic Line Items Array
  items: InvoiceItemDto[] = [
    { description: '', quantity: 1, unitPrice: 0 }
  ];
  
  displayTotal: number = 0;

  constructor(
    private clientService: Client,
    private invoiceService: Invoice
  ) {}

  ngOnInit() {
    this.loadClients();
    this.calculateTotals();
  }

  loadClients() {
    this.clientService.getClients().subscribe({
      next: (data) => this.clients = data,
      error: (err) => console.error('Failed to load clients', err)
    });
  }

  addItem() {
    this.items.push({ description: '', quantity: 1, unitPrice: 0 });
    this.calculateTotals();
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
    this.calculateTotals();
  }

  calculateTotals() {
    this.displayTotal = this.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  }

  isValid(): boolean {
    return !!this.selectedClient && 
           this.items.length > 0 && 
           this.items.every(i => i.description.trim() !== '' && i.unitPrice > 0);
  }

  saveInvoice() {
    if (!this.selectedClient?.id) return;

    const request: CreateInvoiceRequest = {
      clientId: this.selectedClient.id,
      issueDate: this.issueDate,
      dueDate: this.dueDate,
      notes: this.notes,
      items: this.items
    };

    this.invoiceService.createInvoice(request).subscribe({
      next: (res) => {
        alert('Invoice created successfully! ID: ' + res.id);
        // Reset the form or navigate to an invoice list view here
        this.items = [{ description: '', quantity: 1, unitPrice: 0 }];
        this.selectedClient = null;
        this.calculateTotals();
      },
      error: (err) => console.error('Failed to create invoice', err)
    });
  }
}
