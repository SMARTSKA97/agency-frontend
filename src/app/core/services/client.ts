import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ClientModel {
  id?: string;
  businessName: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  website?: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Client {
  private apiUrl = 'http://localhost:5071/api/clients'; // Match your .NET port

  constructor(private http: HttpClient) {}

  getClients(): Observable<ClientModel[]> {
    return this.http.get<ClientModel[]>(this.apiUrl);
  }

  createClient(client: ClientModel): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(this.apiUrl, client);
  }
}
