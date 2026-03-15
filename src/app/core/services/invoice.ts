import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface InvoiceItemDto {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface CreateInvoiceRequest {
  clientId: string;
  issueDate: Date;
  dueDate: Date;
  notes?: string;
  items: InvoiceItemDto[];
}

@Injectable({
  providedIn: 'root',
})
export class Invoice {
  private apiUrl = 'https://localhost:5071/api/invoices'; 

  constructor(private http: HttpClient) {}

  createInvoice(request: CreateInvoiceRequest): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(this.apiUrl, request);
  }
}
