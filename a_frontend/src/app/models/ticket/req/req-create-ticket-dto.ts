import { Ticket } from "../ticket"

export type ReqCreateTicketDTO = Pick<Ticket, 'title' | 'description' | 'category' | 'priority'>