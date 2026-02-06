import { Box } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { SortableHeaderProps } from "@/types/table";

export function SortableHeader<T extends string>({
  label,
  sortKey,
  activeSortKey,
  sortOrder,
  onSort,
}: SortableHeaderProps<T>) {
  const isActive = activeSortKey === sortKey;

  return (
    <Box
      className={`
		flex align-middle items-center
		gap-0.5 cursor-pointer p-0
		${isActive ? "text-primary" : ""}
		hover:bg-transparent
		hover:text-primary`}
      onClick={() => onSort(sortKey)}
    >
      {label}
      <SwapVertIcon
        className={`
			text-sm transition-transform
			${isActive ? "opacity-100" : "opacity-40"}
			${isActive && sortOrder === "desc" ? "rotate-180" : "rotate-none"}
		`}
      />
    </Box>
  );
}
