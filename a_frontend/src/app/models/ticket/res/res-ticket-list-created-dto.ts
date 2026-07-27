import { Ticket } from "../ticket"

export type ResTicketListCreatedDTO = Pick<Ticket, 'id' | 'priority' | 'status' | 'title' | 'description' | 'updatedAt'>
