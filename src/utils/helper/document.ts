// Helper function to extract file extension from filename
export const getFileExtension = (filename: string): string => {
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop()?.toUpperCase() || "DEFAULT" : "DEFAULT";
};

// Helper function to get document type from filename
export const getDocumentTypeFromFilename = (filename: string): string => {
  const ext = getFileExtension(filename);
  const typeMap: Record<string, string> = {
    PDF: "PDF",
    DOC: "DOC",
    DOCX: "DOCX",
    XLS: "XLS",
    XLSX: "XLSX",
    JPG: "JPG",
    JPEG: "JPEG",
    PNG: "PNG",
    TXT: "TXT",
  };
  return typeMap[ext] || "DEFAULT";
};
