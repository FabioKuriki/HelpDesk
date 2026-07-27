package org.helpDesk.domain.attachment.dto.req;

import org.jboss.resteasy.reactive.RestForm;
import org.jboss.resteasy.reactive.multipart.FileUpload;

import java.util.List;

public record ReqAttachmentUploadDTO(
        @RestForm("files")
        List<FileUpload> files
) {}
