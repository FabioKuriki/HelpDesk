import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { Attachment } from '../../models/attachment/attachment';
import { Button } from "../button/button";
import { AttachmentService } from '../../services/backend/attachment/attachment-service';

@Component({
  selector: 'app-attachment-upload',
  imports: [Button],
  templateUrl: './attachment-upload.html',
  styleUrl: './attachment-upload.css',
})
export class AttachmentUpload {
    private attachmentService = inject(AttachmentService)
    private cdr = inject(ChangeDetectorRef)
    @Input({required: true}) ticketId = ""

    ngOnInit(){
        this.useListAttachments(this.ticketId);
    }
    
    attachments: Attachment[] = [];
    
    useListAttachments(ticketId: string){
        this.attachmentService.list(ticketId)
        .subscribe({
            next: (res) => {
                this.attachments = res;
                this.cdr.markForCheck();
            }
        })
    }

    attachmentsUpload: File[] = []

    addFiles(files: File[]) {
        this.attachmentsUpload.push(...files);
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;

        if (!input.files) {
            return;
        }

        const formData = new FormData();

        Array.from(input.files).forEach(file => {
            formData.append('files', file);
        });

        this.useUpload(this.ticketId, formData);

        input.value = '';
    }

    useUpload(ticketId: string, files: FormData){
        this.attachmentService.upload(ticketId, files)
        .subscribe({
            next: () => {
                this.useListAttachments(ticketId);
            }
        })
    }

    selectedAttachment?: Attachment;
    previewUrl?: string;
    
    selectAttachment(attachment: Attachment): void {
        this.selectedAttachment = attachment;
    }

    formatSize(size: number): string {

        if (size < 1024) {
            return `${size} bytes`;
        }

        if (size < 1024 * 1024) {
            return `${(size / 1024).toFixed(1)} KB`;
        }

        return `${(size / (1024 * 1024)).toFixed(1)} MB`;

    }

    isDragging = false;
    
    onDragOver(event: DragEvent): void {
        event.preventDefault();
        this.isDragging = true;
    } 
    onDragLeave(event: DragEvent): void {
        event.preventDefault();
        this.isDragging = false;
    }
    onDrop(event: DragEvent): void {

        event.preventDefault();

        this.isDragging = false;

        const files = event.dataTransfer?.files;

        if (!files?.length) {
            return;
        }

        const formData = new FormData();

        Array.from(files).forEach(file => {
            formData.append('files', file);
        });

        this.useUpload(this.ticketId, formData);
    }

    useDelete(id: string): void {
        this.attachmentService.delete(id)
        .subscribe({
            next: () => this.useListAttachments(this.ticketId)
        })
    }

    openPreview(attachment: Attachment): void {

        this.selectedAttachment = attachment;

        if (attachment.contentType.startsWith('image/')) {

            this.attachmentService
            .download(attachment.id)
            .subscribe(blob => {

                this.previewUrl = URL.createObjectURL(blob);
                this.cdr.markForCheck()

            });

        }

    }

    closePreview(): void {

        if (this.previewUrl) {

            URL.revokeObjectURL(
                this.previewUrl
            );

        }


        this.previewUrl = undefined;
        this.selectedAttachment = undefined;

    }
}
