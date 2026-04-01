import {Status} from './status';

export interface UpdateTicket {
    id: number;
    title: string;
    description: string;
    status: Status;
}
