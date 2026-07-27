package org.helpDesk.domain.attachment;

import io.quarkus.runtime.Startup;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Startup
@ApplicationScoped
public class AttachmentConfig {
    private static final String UPLOAD_DIR = "uploads";

    @PostConstruct
    void cleanUploads() {
        Path directory = Paths.get(UPLOAD_DIR);

        if (!Files.exists(directory)) {
            return;
        }

        try {
            Files.walk(directory)
                    .filter(Files::isRegularFile)
                    .forEach(path -> {
                        try {
                            Files.delete(path);
                        } catch (IOException e) {
                            throw new RuntimeException(
                                    "Erro ao remover arquivo: " + path, e
                            );
                        }
                    });

        } catch (IOException e) {
            throw new RuntimeException("Erro ao limpar uploads", e);
        }
    }
}
