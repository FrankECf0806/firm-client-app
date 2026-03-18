import { ConfigItem } from "@/types/ui";
import { DocumentTypeFilter } from "@/types/document";
import {
  PictureAsPdfOutlined as PdfIcon,
  Description as DocIcon,
  TableChart as XlsIcon,
  Image as ImageIcon,
  TextSnippet as TxtIcon,
  Folder as DefaultIcon,
} from "@mui/icons-material";
import { SvgIconComponent } from "@mui/icons-material";

// Document type constants
export const ALL_DOCUMENT_TYPES = "ALL_TYPES";

// Document type icons
export const DOCUMENT_TYPE_ICONS: Record<string, SvgIconComponent> = {
  PDF: PdfIcon,
  DOC: DocIcon,
  DOCX: DocIcon,
  XLS: XlsIcon,
  XLSX: XlsIcon,
  JPG: ImageIcon,
  JPEG: ImageIcon,
  PNG: ImageIcon,
  TXT: TxtIcon,
  DEFAULT: DefaultIcon,
};

// Document type colors for UI badges
export const DOCUMENT_TYPE_COLORS: Record<string, string> = {
  PDF: "bg-red-100 text-red-700 border border-red-200",
  DOC: "bg-primary/15 text-blue-700 border border-blue-200",
  DOCX: "bg-primary/15  text-blue-700 border border-blue-200",
  XLS: "bg-green-100 text-green-700 border border-green-200",
  XLSX: "bg-green-100 text-green-700 border border-green-200",
  JPG: "bg-purple-100 text-purple-700 border border-purple-200",
  JPEG: "bg-purple-100 text-purple-700 border border-purple-200",
  PNG: "bg-purple-100 text-purple-700 border border-purple-200",
  TXT: "bg-gray-100 text-gray-700 border border-gray-200",
  DEFAULT: "bg-gray-100 text-gray-700 border border-gray-200",
};

// Document type display labels
export const DOCUMENT_TYPE_LABELS: Record<string, string> = {
  PDF: "PDF",
  DOC: "Word",
  DOCX: "Word",
  XLS: "XLS",
  XLSX: "XLSX",
  JPG: "Image",
  JPEG: "Image",
  PNG: "Image",
  TXT: "Text File",
  DEFAULT: "Document",
};

// Document type config for filters
export const DOCUMENT_TYPE_CONFIG: Record<
  DocumentTypeFilter,
  ConfigItem<DocumentTypeFilter>
> = {
  ALL_DOCUMENT_TYPES: {
    label: "All Types",
    styling: {
      color: "primary",
      selectedClass: "bg-primary-600 text-white",
      unselectedClass:
        "bg-primary-50 text-primary-700 border border-primary-200 hover:bg-primary-100",
      icon: DefaultIcon,
    },
    onClick: (setType) => setType(ALL_DOCUMENT_TYPES),
  },
  PDF: {
    label: "PDF",
    styling: {
      selectedClass: "bg-red-600 text-white",
      unselectedClass:
        "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100",
      icon: PdfIcon,
    },
    onClick: (setType) => setType("PDF"),
  },
  DOC: {
    label: "Word",
    styling: {
      selectedClass: "bg-blue-600 text-white",
      unselectedClass:
        "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100",
      icon: DocIcon,
    },
    onClick: (setType) => setType("DOC"),
  },
  DOCX: {
    label: "Word",
    styling: {
      selectedClass: "bg-blue-600 text-white",
      unselectedClass:
        "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100",
      icon: DocIcon,
    },
    onClick: (setType) => setType("DOCX"),
  },
  XLS: {
    label: "Excel",
    styling: {
      selectedClass: "bg-green-600 text-white",
      unselectedClass:
        "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100",
      icon: XlsIcon,
    },
    onClick: (setType) => setType("XLS"),
  },
  XLSX: {
    label: "Excel",
    styling: {
      selectedClass: "bg-green-600 text-white",
      unselectedClass:
        "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100",
      icon: XlsIcon,
    },
    onClick: (setType) => setType("XLSX"),
  },
  JPG: {
    label: "Image",
    styling: {
      selectedClass: "bg-purple-600 text-white",
      unselectedClass:
        "bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100",
      icon: ImageIcon,
    },
    onClick: (setType) => setType("JPG"),
  },
  JPEG: {
    label: "Image",
    styling: {
      selectedClass: "bg-purple-600 text-white",
      unselectedClass:
        "bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100",
      icon: ImageIcon,
    },
    onClick: (setType) => setType("JPEG"),
  },
  PNG: {
    label: "Image",
    styling: {
      selectedClass: "bg-purple-600 text-white",
      unselectedClass:
        "bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100",
      icon: ImageIcon,
    },
    onClick: (setType) => setType("PNG"),
  },
  TXT: {
    label: "Text",
    styling: {
      selectedClass: "bg-gray-600 text-white",
      unselectedClass:
        "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100",
      icon: TxtIcon,
    },
    onClick: (setType) => setType("TXT"),
  },
};

// Quick filter presets
export const QUICK_FILTER_DOCUMENT_TYPE_KEYS: DocumentTypeFilter[] = [
  ALL_DOCUMENT_TYPES,
  "PDF",
  "DOC",
  "DOCX",
  "XLS",
  "XLSX",
] as const;
