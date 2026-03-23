import { FileExtension } from "@/enums/document";
import { FileExtensionKey } from "@/types/document";

export const getDocumentTypeFromFilename = (
  filename: string,
): FileExtensionKey => {
  const parts = filename.split(".");
  const ext = parts.length > 1 ? parts.pop()?.toUpperCase() : "DEFAULT";

  if (ext && ext in FileExtension) {
    return ext as FileExtensionKey;
  }

  return "DEFAULT" as FileExtensionKey;
};
