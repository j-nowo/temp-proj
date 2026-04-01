import { Component, OnInit, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Ticket } from '../../ticket';
import { TicketService } from '../../services/ticket';
import { TicketForm } from '../ticket-form/ticket-form';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  template: `
    <section>
      <div class="example-button-row">
        <div class="example-flex-container">
          <button matFab extended (click)="openNew()">
            <mat-icon>add</mat-icon>
            Add new ticket
          </button>
        </div>
      </div>
    </section>
    <section class="tasks-section">
      <h3>Tasks</h3>
      @for (apeTicket of apeTickets(); track $index) {
        <mat-list class="example-list-wrapping">
          <a
            mat-list-item
            [lines]="5"
            (click)="openEdit(apeTicket)"
          >
            <h4 matListItemTitle>{{ apeTicket.title }}</h4>
            <span matListItemLine class="description-truncate">{{ apeTicket.description }}</span>
            <span matListItemMeta>
              <mat-chip>{{ apeTicket.status }}</mat-chip>
            </span>
          </a>
        </mat-list>
      }
    </section>
    @if (showForm()) {
      <app-ticket-form
        [ticket]="selectedTicket()"
        (saved)="onSave($event)"
        (deleted)="onDelete($event)"
        (closed)="closeForm()"
      />
    }
  `,
  styleUrl: './ticket-list.css',
  imports: [MatListModule, MatChipsModule, MatButtonModule, MatDividerModule, MatIconModule, TicketForm],
})
export class TicketList implements OnInit {
  apeTickets = signal<Ticket[]>([]);
  selectedTicket = signal<Ticket | null>(null);
  showForm = signal(false);

  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    this.ticketService.getTickets().subscribe({
      next: (tickets) => this.apeTickets.set(tickets)
    });
  }

  openNew() {
    this.selectedTicket.set(null);
    this.showForm.set(true);
  }

  openEdit(ticket: Ticket) {
    this.selectedTicket.set(ticket);
    this.showForm.set(true);
  }

  closeForm() {
    this.showForm.set(false);
    this.selectedTicket.set(null);
  }

  onSave(form: Partial<Ticket>) {
    const existing = this.selectedTicket();
    if (existing) {
      this.ticketService.updateTicket({ ...existing, ...form }).subscribe({
        next: (updated) => {
          this.apeTickets.update(tickets => tickets.map(t => t.id === updated.id ? updated : t));
          this.closeForm();
        }
      });
    } else {
      this.ticketService.createTicket(form as { title: string; description: string }).subscribe({
        next: (created) => {
          this.apeTickets.update(tickets => [...tickets, created]);
          this.closeForm();
        }
      });
    }
  }

  onDelete(id: string) {
    this.ticketService.deleteTicket(id).subscribe({
      next: () => {
        this.apeTickets.update(tickets => tickets.filter(t => t.id !== id));
        this.closeForm();
      }
    });
  }
}