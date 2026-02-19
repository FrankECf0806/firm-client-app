import { Grid, Typography } from "@mui/material";
import { AppChip } from "./AppChip";
import { QuickFilterChipsProps } from "@/types/ui";

export function QuickFilterChips<K extends string>({
  title,
  items,
  value,
  onChange,
}: QuickFilterChipsProps<K>) {
  return (
    <>
      <Typography
        variant="subtitle2"
        className="text-gray-700 font-semibold mb-2"
      >
        {title}:
      </Typography>

      <Grid container spacing={1}>
        {items.map(([key, item]) => {
          const isSelected = value === key;

          return (
            <Grid key={key} size="auto">
              <AppChip
                config={item}
                selected={isSelected}
                onClick={() => item.onClick?.(onChange)}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
