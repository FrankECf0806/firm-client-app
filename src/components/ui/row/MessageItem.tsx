// src/components/ui/row/MessageItem.tsx

import { Box } from "@mui/material";
import { Client } from "@/types/client";
import { ListRow } from "@/components/ui/list/ListRow";
import {
  COMMUNICATION_TYPE_CONFIG,
  COMMUNICATION_STATUS_CONFIG,
} from "@/utils/constant/communication";
import {
  CommunicationTypeKey,
  CommunicationStatusKey,
} from "@/types/communication";
import { OverviewChip } from "@/components/ui/chip/OverviewChip";

interface MessageItemProps {
  senderId: string;
  message: string;
  time: string;
  type?: CommunicationTypeKey;
  status: CommunicationStatusKey;
  clients: Map<string, Client>;
}

export function MessageItem({
  senderId,
  message,
  time,
  type = "MESSAGE",
  status,
  clients,
}: MessageItemProps) {
  const client = clients.get(senderId);
  const displayName = client
    ? `${client.firstName} ${client.lastName}`
    : "Unknown Client";
  const avatar = displayName[0] || "?";

  const typeConfig = COMMUNICATION_TYPE_CONFIG[type];
  const statusConfig = COMMUNICATION_STATUS_CONFIG[status];

  const isUnread = status === "UNREAD";

  const getChipContent = () => {
    if (status === "UNREAD") {
      return {
        label: "New",
        color: statusConfig.styling?.unselectedClass,
      };
    } else if (status === "ARCHIVED") {
      return {
        label: "Archived",
        color: statusConfig.styling?.unselectedClass,
      };
    } else {
      return {
        label: typeConfig.label,
        color: typeConfig.styling?.unselectedClass,
      };
    }
  };

  const chipContent = getChipContent();

  // Title with dot indicator for unread
  const titleWithDot = (
    <Box className="flex items-center gap-1.5">
      {isUnread && (
        <Box className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
      )}
      <span className={isUnread ? "font-semibold" : ""}>{displayName}</span>
    </Box>
  );

  return (
    <ListRow
      avatar={avatar}
      title={titleWithDot}
      subtitle={message}
      meta={time}
      badge={
        <OverviewChip
          label={chipContent.label}
          color={chipContent.color}
          size="small"
        />
      }
      highlight={isUnread}
    />
  );
}
