import { ManagementProps } from "@/types/layout";
import { Box, Breadcrumbs, Chip, Typography } from "@mui/material";
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
} from "@mui/icons-material";
import Link from "next/link";

export default function ManagementLayout({
  children,
  title,
  subtitle,
  breadcrumbs = [],
  actions,
  metadata,
  metadataPosition = "below",
  showHeader = true,
}: ManagementProps) {
  // Default breadcrumbs if none provided
  const defaultBreadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: title, href: undefined },
  ];

  const breadcrumbsList =
    breadcrumbs.length > 0 ? breadcrumbs : defaultBreadcrumbs;

  return (
    <Box className="p-1 md:p-2">
      {/* Breadcrumbs */}
      {breadcrumbsList.length > 0 && (
        <Breadcrumbs
          aria-label="breadcrumb"
          className="mb-4 md:mb-6"
          separator={<NavigateNextIcon fontSize="small" />}
        >
          {breadcrumbsList.map((item, index) => (
            <Box key={index}>
              {item.href ? (
                <Link
                  href={item.href}
                  className="flex items-center text-gray-600 hover:text-primary transition-colors no-underline text-sm md:text-base"
                >
                  {index === 0 && (
                    <HomeIcon className="mr-1 text-sm md:text-lg" />
                  )}
                  {item.label}
                </Link>
              ) : (
                <Typography className="flex items-center text-primary font-medium text-sm md:text-base">
                  {item.label}
                </Typography>
              )}
            </Box>
          ))}
        </Breadcrumbs>
      )}

      {/* Header with Title, Subtitle, and Actions */}
      {showHeader && (
        <Box className="mb-6 md:mb-8">
          {/* Title Row */}
          <Box className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-3">
            <Box className="flex-1">
              <Box className="flex items-center gap-1 flex-wrap">
                <Typography
                  variant="h4"
                  className="font-bold text-xl md:text-3xl truncate max-w-full"
                >
                  {title}
                </Typography>

                {/* Metadata chips - inline next to title */}
                {metadata && metadataPosition === "inline" && (
                  <Box className="flex items-center gap-1">
                    {metadata.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <Chip
                          key={index}
                          label={item.label}
                          color={item.color}
                          size={item.size ?? "small"}
                          className={item.className}
                          icon={Icon ? <Icon className="w-3 h-3" /> : undefined}
                          sx={{ height: "1.5rem" }}
                        />
                      );
                    })}
                  </Box>
                )}
              </Box>

              {subtitle && (
                <Typography
                  variant="body1"
                  className="text-gray-500 text-sm md:text-base"
                >
                  {subtitle}
                </Typography>
              )}
            </Box>

            {/* Actions - Right side on desktop, full width on mobile */}
            {actions && (
              <Box className="flex flex-wrap gap-2 md:gap-3 mt-2 md:mt-0">
                {actions}
              </Box>
            )}
          </Box>
        </Box>
      )}

      {/* Page Content */}
      {children}
    </Box>
  );
}
