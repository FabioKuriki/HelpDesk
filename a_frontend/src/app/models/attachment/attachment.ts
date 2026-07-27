import { Ticket } from "../ticket/ticket";

export interface Attachment{
    id: string;
    fileName: string;
    contentType: string;
    fileSize: number;
    filePath: string;
    ticket: Ticket
}