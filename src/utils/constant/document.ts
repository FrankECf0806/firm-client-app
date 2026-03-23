import { ConfigItem } from "@/types/ui";
import {
  FileExtensionFilter,
  FileExtensionGroupFilter,
  TableDocumentSortKey,
} from "@/types/document";
import {
  PictureAsPdfOutlined as PdfIcon,
  Description as DocIcon,
  TableChart as XlsIcon,
  Image as ImageIcon,
  TextSnippet as TxtIcon,
  Folder as DefaultIcon,
} from "@mui/icons-material";
import { TableColumn } from "@/types/table";
import { FileExtension } from "@/enums/document";

export const ALL_DOCUMENT_TYPES = "ALL_TYPES";
export const ALL_CASES_BY_CLIENT = "ALL_CASES";
export const WORD_FILTER = "WORD";
export const PDF_FILTER = "PDF";

// Map each file extension group to the actual file extensions it includes
export const GROUP_TO_EXTENSIONS: Record<string, string[]> = {
  PDF: [FileExtension.PDF],
  WORD: [FileExtension.DOC, FileExtension.DOCX],
  EXCEL: [FileExtension.XLS, FileExtension.XLSX],
  IMAGE: [FileExtension.JPG, FileExtension.JPEG, FileExtension.PNG],
  TEXT: [FileExtension.TXT],
  OTHER: [FileExtension.DEFAULT],
};

// File extension badge colors
export const FILE_EXTENSION_COLORS: Record<string, string> = {
  PDF: "bg-red-100 text-red-600 border border-red-200",
  DOC: "bg-primary/10 text-blue-700 border border-blue-200",
  DOCX: "bg-primary/10 text-blue-700 border border-blue-200",
  XLS: "bg-green-100 text-green-700 border border-green-200",
  XLSX: "bg-green-100 text-green-700 border border-green-200",
  JPG: "bg-purple-100 text-purple-700 border border-purple-200",
  JPEG: "bg-purple-100 text-purple-700 border border-purple-200",
  PNG: "bg-purple-100 text-purple-700 border border-purple-200",
  TXT: "bg-gray-100 text-gray-700 border border-gray-200",
  DEFAULT: "bg-gray-100 text-gray-700 border border-gray-200",
};

// Selected styles (solid dark backgrounds)
const SELECTED_STYLES: Record<string, string> = {
  PDF: "bg-red-600 text-white",
  DOC: "bg-blue-600 text-white",
  DOCX: "bg-blue-600 text-white",
  XLS: "bg-green-600 text-white",
  XLSX: "bg-green-600 text-white",
  JPG: "bg-purple-600 text-white",
  JPEG: "bg-purple-600 text-white",
  PNG: "bg-purple-600 text-white",
  TXT: "bg-gray-600 text-white",
  DEFAULT: "bg-gray-600 text-white",
};

// Hover styles for unselected state
const HOVER_STYLES: Record<string, string> = {
  PDF: "hover:bg-red-200 hover:border-red-300",
  DOC: "hover:bg-blue-200 hover:border-blue-300",
  DOCX: "hover:bg-blue-200 hover:border-blue-300",
  XLS: "hover:bg-green-200 hover:border-green-300",
  XLSX: "hover:bg-green-200 hover:border-green-300",
  JPG: "hover:bg-purple-200 hover:border-purple-300",
  JPEG: "hover:bg-purple-200 hover:border-purple-300",
  PNG: "hover:bg-purple-200 hover:border-purple-300",
  TXT: "hover:bg-gray-200 hover:border-gray-300",
  DEFAULT: "hover:bg-gray-200 hover:border-gray-300",
};

// File extension config for filters (used in dropdowns and quick filters)
export const FILE_EXTENSION_CONFIG: Record<
  FileExtensionFilter,
  ConfigItem<FileExtensionFilter>
> = {
  [ALL_DOCUMENT_TYPES]: {
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
      selectedClass: SELECTED_STYLES.PDF,
      unselectedClass: `${FILE_EXTENSION_COLORS.PDF} ${HOVER_STYLES.PDF}`,
      icon: PdfIcon,
      iconBg: "bg-red-600",
    },
    onClick: (setType) => setType("PDF"),
  },
  DOC: {
    label: "Word",
    styling: {
      selectedClass: SELECTED_STYLES.DOC,
      unselectedClass: `${FILE_EXTENSION_COLORS.DOC} ${HOVER_STYLES.DOC}`,
      icon: DocIcon,
      iconBg: "bg-blue-600",
    },
    onClick: (setType) => setType("DOC"),
  },
  DOCX: {
    label: "Word",
    styling: {
      selectedClass: SELECTED_STYLES.DOCX,
      unselectedClass: `${FILE_EXTENSION_COLORS.DOCX} ${HOVER_STYLES.DOCX}`,
      icon: DocIcon,
      iconBg: "bg-blue-600",
    },
    onClick: (setType) => setType("DOCX"),
  },
  XLS: {
    label: "Excel",
    styling: {
      selectedClass: SELECTED_STYLES.XLS,
      unselectedClass: `${FILE_EXTENSION_COLORS.XLS} ${HOVER_STYLES.XLS}`,
      icon: XlsIcon,
      iconBg: "bg-green-600",
    },
    onClick: (setType) => setType("XLS"),
  },
  XLSX: {
    label: "Excel",
    styling: {
      selectedClass: SELECTED_STYLES.XLSX,
      unselectedClass: `${FILE_EXTENSION_COLORS.XLSX} ${HOVER_STYLES.XLSX}`,
      icon: XlsIcon,
      iconBg: "bg-green-600",
    },
    onClick: (setType) => setType("XLSX"),
  },
  JPG: {
    label: "Image",
    styling: {
      selectedClass: SELECTED_STYLES.JPG,
      unselectedClass: `${FILE_EXTENSION_COLORS.JPG} ${HOVER_STYLES.JPG}`,
      icon: ImageIcon,
      iconBg: "bg-purple-600",
    },
    onClick: (setType) => setType("JPG"),
  },
  JPEG: {
    label: "Image",
    styling: {
      selectedClass: SELECTED_STYLES.JPEG,
      unselectedClass: `${FILE_EXTENSION_COLORS.JPEG} ${HOVER_STYLES.JPEG}`,
      icon: ImageIcon,
      iconBg: "bg-purple-600",
    },
    onClick: (setType) => setType("JPEG"),
  },
  PNG: {
    label: "Image",
    styling: {
      selectedClass: SELECTED_STYLES.PNG,
      unselectedClass: `${FILE_EXTENSION_COLORS.PNG} ${HOVER_STYLES.PNG}`,
      icon: ImageIcon,
      iconBg: "bg-purple-600",
    },
    onClick: (setType) => setType("PNG"),
  },
  TXT: {
    label: "Text",
    styling: {
      selectedClass: SELECTED_STYLES.TXT,
      unselectedClass: `${FILE_EXTENSION_COLORS.TXT} ${HOVER_STYLES.TXT}`,
      icon: TxtIcon,
      iconBg: "bg-gray-600",
    },
    onClick: (setType) => setType("TXT"),
  },
  DEFAULT: {
    label: "File",
    styling: {
      selectedClass: SELECTED_STYLES.DEFAULT,
      unselectedClass: `${FILE_EXTENSION_COLORS.DEFAULT} ${HOVER_STYLES.DEFAULT}`,
      icon: DefaultIcon,
      iconBg: "bg-gray-600",
    },
    onClick: (setType) => setType("DEFAULT"),
  },
};

export const FILE_GROUP_CONFIG: Record<
  FileExtensionGroupFilter,
  ConfigItem<FileExtensionGroupFilter>
> = {
  [ALL_DOCUMENT_TYPES]: {
    ...FILE_EXTENSION_CONFIG[ALL_DOCUMENT_TYPES],
    onClick: (setType) => setType(ALL_DOCUMENT_TYPES),
  },

  PDF: {
    ...FILE_EXTENSION_CONFIG.PDF,
    onClick: (setType) => setType("PDF"),
  },

  WORD: {
    ...FILE_EXTENSION_CONFIG.DOC,
    label: "Word",
    onClick: (setType) => setType("WORD"),
  },

  EXCEL: {
    ...FILE_EXTENSION_CONFIG.XLS,
    label: "Excel",
    onClick: (setType) => setType("EXCEL"),
  },

  IMAGE: {
    ...FILE_EXTENSION_CONFIG.JPG,
    label: "Image",
    onClick: (setType) => setType("IMAGE"),
  },

  TEXT: {
    ...FILE_EXTENSION_CONFIG.TXT,
    label: "Text",
    onClick: (setType) => setType("TEXT"),
  },
  OTHER: {
    ...FILE_EXTENSION_CONFIG.DEFAULT,
    label: "Other",
    onClick: (setType) => setType("OTHER"),
  },
};

// Quick filter presets
export const DOCUMENT_QUICK_FILTER_KEYS: FileExtensionGroupFilter[] = [
  ALL_DOCUMENT_TYPES,
  PDF_FILTER,
  WORD_FILTER,
] as const;

export const QUICK_FILTER_DOCUMENTS = Object.entries(FILE_GROUP_CONFIG).filter(
  ([key]) =>
    DOCUMENT_QUICK_FILTER_KEYS.includes(key as FileExtensionGroupFilter),
);

// Table columns
export const DOCUMENT_COLUMNS: TableColumn<TableDocumentSortKey>[] = [
  {
    field: "name",
    label: "Name",
    minWidth: 300,
    sortable: true,
    sortKey: "name",
  },
  {
    field: "caseId",
    label: "Case",
    minWidth: 200,
    sortable: true,
    sortKey: "caseId",
  },
  {
    field: "type",
    label: "Type",
    minWidth: 120,
    sortable: true,
    sortKey: "fileExt",
  },
  {
    field: "size",
    label: "Size",
    minWidth: 100,
    sortable: true,
    sortKey: "size",
  },
  {
    field: "uploadDate",
    label: "Uploaded",
    minWidth: 150,
    sortable: true,
    sortKey: "createdAt",
  },
  { field: "actions", label: "Actions", minWidth: 120, align: "right" },
];
