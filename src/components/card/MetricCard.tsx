import { Box, Card, CardContent, Typography, Tooltip } from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  HorizontalRule as HorizontalRuleIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { MetricCardProps } from "@/types/metric";

export function MetricCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  linkTo,
  tooltip,
}: MetricCardProps) {
  const router = useRouter();

  const TrendIcon =
    changeType === "positive"
      ? TrendingUpIcon
      : changeType === "negative"
        ? TrendingDownIcon
        : HorizontalRuleIcon;

  const trendColor =
    changeType === "positive"
      ? "text-green-500"
      : changeType === "negative"
        ? "text-red-500"
        : "text-gray-500";

  const card = (
    <Card
      className={`
        h-full
		rounded-lg
        transition-all duration-200 ease-in-out
        ${linkTo ? "cursor-pointer hover:shadow-lg hover:-translate-y-0.5" : ""}
      `}
      onClick={() => linkTo && router.push(linkTo)}
    >
      <CardContent className="p-3 sm:p-5 last:pb-5">
        <Box className="flex justify-between items-start">
          <Box className="flex-1">
            <Typography
              variant="body2"
              className="text-gray-500 font-medium text-sm mb-1"
            >
              {title}
            </Typography>
            <Typography
              variant="h4"
              className="font-bold text-gray-900 text-2xl leading-tight"
            >
              {value}
            </Typography>
            {change && (
              <Box className="flex items-center gap-1 mt-2">
                <TrendIcon className={`w-3.5 h-3.5 ${trendColor}`} />
                <Typography
                  variant="body2"
                  className={`${trendColor} font-medium text-xs`}
                >
                  {change}
                </Typography>
              </Box>
            )}
          </Box>
          <Box className="relative w-11 h-11 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Icon className="w-5.5 h-5.5 text-blue-500 absolute opacity-100" />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return tooltip ? (
    <Tooltip title={tooltip} arrow>
      {card}
    </Tooltip>
  ) : (
    card
  );
}
