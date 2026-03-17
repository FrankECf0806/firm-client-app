import { ListRow } from "@/components/ui/list/ListRow";
import {
  DOCUMENT_TYPE_COLORS,
  DOCUMENT_TYPE_ICONS,
  DOCUMENT_TYPE_LABELS,
} from "@/utils/constant/document";
import { getDocumentTypeFromFilename } from "@/utils/helper/document";
import { OverviewChip } from "@/components/ui/chip/OverviewChip";

interface FileItemProps {
  name: string;
  date: string;
  size: string;
}

export function FileItem({ name, date, size }: FileItemProps) {
  const fileType = getDocumentTypeFromFilename(name);
  const Icon = DOCUMENT_TYPE_ICONS[fileType] || DOCUMENT_TYPE_ICONS.DEFAULT;
  const typeColor =
    DOCUMENT_TYPE_COLORS[fileType] || DOCUMENT_TYPE_COLORS.DEFAULT;
  const typeLabel = DOCUMENT_TYPE_LABELS[fileType] || "Document";

  return (
    <ListRow
      icon={Icon}
      title={name}
      subtitle={`${date} · ${size}`}
      badge={
        <OverviewChip label={typeLabel} size="small" className={typeColor} />
      }
      iconBgColor="bg-primary/10"
      iconColor="text-primary"
    />
  );
}
