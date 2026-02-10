import { SvgIconComponent } from "@mui/icons-material";

export interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType: "positive" | "negative" | "neutral";
  icon: SvgIconComponent;
  linkTo?: string;
  tooltip?: string;
}
