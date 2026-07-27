import { User } from "../user/user";

export interface Ticket{
    id: string,
    title: string,
    description: string,
    category: string,
    requester: User,
    responsible: User | null,
    status: string,
    priority: string,
    createdAt: string,
    updatedAt: string,
    closedAt: string | null,
}