// components/ui/QuickFilterChips.tsx
import { Grid, Typography, Chip, ChipProps } from "@mui/material";
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
          const { styling = {} } = item;

          // Build chip props safely
          const chipProps: ChipProps = {
            label: item.label,
            variant: isSelected ? "filled" : "outlined",
            onClick: () => item.onClick(onChange),
          };

          // Add conditional props
          if (styling.color) {
            chipProps.color = styling.color;
          }

          if (styling.sx) {
            chipProps.sx = styling.sx;
          }

          if (styling.selectedClass && styling.unselectedClass) {
            chipProps.className = isSelected
              ? styling.selectedClass
              : styling.unselectedClass;
          }

          return (
            <Grid key={key} size="auto">
              <Chip {...chipProps} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
