import { ListRow } from "@/components/ui/list/ListRow";
import { FILE_EXTENSION_CONFIG } from "@/utils/constant/document";
import { getDocumentTypeFromFilename } from "@/utils/helper/document";
import { OverviewChip } from "@/components/ui/chip/OverviewChip";

interface FileItemProps {
  name: string;
  date: string;
  size: string;
}

export function FileItem({ name, date, size }: FileItemProps) {
  const fileType = getDocumentTypeFromFilename(name);
  const Icon =
    FILE_EXTENSION_CONFIG[fileType].styling?.icon ||
    FILE_EXTENSION_CONFIG["DEFAULT"].styling?.icon;
  const typeColor =
    FILE_EXTENSION_CONFIG[fileType].styling?.unselectedClass ||
    FILE_EXTENSION_CONFIG["DEFAULT"].styling?.unselectedClass;
  const typeLabel =
    FILE_EXTENSION_CONFIG[fileType].label ||
    FILE_EXTENSION_CONFIG["DEFAULT"].label;

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
