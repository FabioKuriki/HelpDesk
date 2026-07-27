package org.helpDesk.domain.attachment.dto.res;

import java.nio.file.Path;

public record ResAttachmentDownloadDTO(
    Path path,
    String fileName,
    String contentType
) {}