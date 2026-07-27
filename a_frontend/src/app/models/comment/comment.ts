import { Ticket } from "../ticket/ticket";
import { User } from "../user/user";

export interface Comment{
    id: string,
    ticket: Ticket,
    author: User,
    text: string,
    createdAt: string
}