import {Component} from '@angular/core';
import {TicketList} from './components/ticket-list/ticket-list';

@Component({
  selector: 'app-root',
  imports: [TicketList],
  template: `
    <main>
      <header class="brand-name">
        <img class="brand-logo" src="/public/logo.svg" alt="logo" aria-hidden="true" />
      </header>
      <section class="content">
        <app-ticket-list />
      </section>
    </main>
    `,
  styleUrl: './app.css',
})
export class App {
  title = 'TicketUp';
}
