import { Status } from './status';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: Status;
}
