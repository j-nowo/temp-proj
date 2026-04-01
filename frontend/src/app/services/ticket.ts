import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../ticket';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private baseUrl = 'http://localhost:8000';
  
  constructor(private http: HttpClient) {}

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.baseUrl}/tickets`);
  }

  createTicket(body: { title: string; description: string }): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.baseUrl}/tickets`, body);
  }

  updateTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.baseUrl}/tickets/${ticket.id}`, ticket);
  }

  deleteTicket(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tickets/${id}`);
  }
}