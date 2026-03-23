import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Chip,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  MoreVert as MoreIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from "@mui/icons-material";
import { Document } from "@/types/document";
import { getDocumentTypeFromFilename } from "@/utils/helper/document";
import { formatRelativeTimeFromNow } from "@/utils/date";
import { FILE_EXTENSION_CONFIG } from "@/utils/constant/document";
import { BaseCard } from "@/components/card/BaseCard";

interface DocumentCardProps {
  document: Document;
  caseName?: string;
  onDownload?: (doc: Document) => void;
  onShare?: (doc: Document) => void;
  onDelete?: (doc: Document) => void;
  onToggleStar?: (doc: Document) => void;
  onClick?: (doc: Document) => void;
}

export function DocumentCard({
  document,
  caseName,
  onDownload,
  onShare,
  onDelete,
  onToggleStar,
  onClick,
}: DocumentCardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isStarred, setIsStarred] = useState(document.isStarred || false);

  const fileExt = getDocumentTypeFromFilename(document.name);
  const IconComponent =
    FILE_EXTENSION_CONFIG[fileExt]?.styling?.icon ||
    FILE_EXTENSION_CONFIG.DEFAULT.styling?.icon;
  const iconBg =
    FILE_EXTENSION_CONFIG[fileExt]?.styling?.iconBg ||
    FILE_EXTENSION_CONFIG.DEFAULT.styling?.iconBg;
  const typeColor =
    FILE_EXTENSION_CONFIG[fileExt]?.styling?.unselectedClass ||
    FILE_EXTENSION_CONFIG.DEFAULT.styling?.unselectedClass;
  const typeLabel =
    FILE_EXTENSION_CONFIG[fileExt]?.label ||
    FILE_EXTENSION_CONFIG.DEFAULT.label;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action: ((doc: Document) => void) | undefined) => {
    return (e: React.MouseEvent) => {
      e.stopPropagation();
      handleMenuClose();
      action?.(document);
    };
  };

  const handleToggleStar = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsStarred(!isStarred);
    onToggleStar?.(document);
  };

  return (
    <>
      <BaseCard
        className="cursor-pointer hover:shadow-lg transition-all duration-200"
        onClick={() => onClick?.(document)}
      >
        <Box className="flex items-start justify-between mb-2">
          <Box className="flex items-center gap-2 flex-1 min-w-0">
            <Box className={`p-2 rounded-lg shrink-0 ${iconBg}`}>
              {IconComponent && (
                <IconComponent className="text-white text-xl" />
              )}
            </Box>
            <Box className="min-w-0 flex-1">
              <Typography className="font-medium text-sm truncate">
                {document.name}
              </Typography>
              <Typography className="text-xs text-gray-500">
                {document.size} ·{" "}
                {formatRelativeTimeFromNow(document.createdAt)}
              </Typography>
            </Box>
          </Box>

          <Box className="flex items-center gap-1 shrink-0">
            <IconButton size="small" onClick={handleToggleStar}>
              {isStarred ? (
                <StarIcon className="text-yellow-500 text-sm" />
              ) : (
                <StarBorderIcon className="text-gray-400 text-sm" />
              )}
            </IconButton>
            <IconButton size="small" onClick={handleMenuOpen}>
              <MoreIcon className="text-gray-500 text-sm" />
            </IconButton>
          </Box>
        </Box>

        {document.description ? (
          <Typography className="text-xs text-gray-600 mb-2 line-clamp-2 truncate">
            {document.description}
          </Typography>
        ) : (
          <Typography className="text-xs text-gray-600 mb-2 line-clamp-2 truncate">
            -
          </Typography>
        )}

        <Box className="flex items-center justify-between mt-2">
          <Chip
            label={typeLabel}
            size="small"
            className={`text-[10px] h-5 ${typeColor}`}
          />
          {caseName && (
            <Typography className="text-[10px] text-gray-400 truncate ml-2">
              {caseName}
            </Typography>
          )}
        </Box>
      </BaseCard>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem onClick={handleAction(onDownload)} dense>
          <DownloadIcon className="text-sm mr-2" /> Download
        </MenuItem>
        <MenuItem onClick={handleAction(onShare)} dense>
          <ShareIcon className="text-sm mr-2" /> Share
        </MenuItem>
        <MenuItem
          onClick={handleAction(onDelete)}
          dense
          className="text-red-600"
        >
          <DeleteIcon className="text-sm mr-2" /> Delete
        </MenuItem>
      </Menu>
    </>
  );
}
