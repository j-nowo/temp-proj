import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Ticket } from '../../ticket';
import { Status } from '../../status';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule],
  template: `
    <div class="overlay">
      <div class="panel">
        <button mat-icon-button class="close-btn" (click)="closed.emit()">
          <mat-icon>close</mat-icon>
        </button>
        <mat-form-field class="field">
          <mat-label>Title</mat-label>
          <input matInput [(ngModel)]="form.title" name="title" />
        </mat-form-field>
        <mat-form-field class="field">
          <mat-label>Description</mat-label>
          <textarea matInput [(ngModel)]="form.description" name="description" rows="4"></textarea>
        </mat-form-field>
        <mat-form-field class="field">
          <mat-label>Status</mat-label>
          <mat-select [(ngModel)]="form.status" name="status">
            @for (s of statuses; track s) {
              <mat-option [value]="s">{{ s }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
        <div class="actions">
          @if (ticket) {
            <button mat-stroked-button color="warn" (click)="delete()">Delete</button>
          }
          <button mat-flat-button color="primary" (click)="save()">Save</button>
        </div>
      </div>
    </div>
  `,
  styleUrl: './ticket-form.css',
})
export class TicketForm implements OnChanges {
  @Input() ticket: Ticket | null = null;
  @Output() saved = new EventEmitter<Partial<Ticket>>();
  @Output() deleted = new EventEmitter<string>();
  @Output() closed = new EventEmitter<void>();

  form: Partial<Ticket> = {};
  statuses = Object.values(Status);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ticket']) {
      this.form = this.ticket ? { ...this.ticket } : { status: Status.todo };
    }
  }

  save() {
    this.saved.emit(this.form);
  }

  delete() {
    this.deleted.emit(this.ticket!.id);
  }
}
