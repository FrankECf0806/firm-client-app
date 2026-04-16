"use client";

import { Box, Avatar, Typography, Divider, IconButton } from "@mui/material";
import {
  PersonOutline as PersonIcon,
  MailOutlineRounded as EmailIcon,
  PhoneOutlined as PhoneIcon,
  LocationOnOutlined as LocationIcon,
  OpenInNew as OpenInNewIcon,
} from "@mui/icons-material";
import { BaseCard } from "@/components/card/BaseCard";
import { InfoRow } from "@/components/ui/row/InfoRow";
import { Client } from "@/types/client";

interface ClientInfoCardProps {
  client: Client | null | undefined;
}

export function ClientInfoCard({ client }: ClientInfoCardProps) {
  const showOpenButton = !!client?.id;

  // Derive client name safely
  const clientName = client
    ? `${client.firstName} ${client.lastName}`
    : "Unknown Client";

  return (
    <BaseCard title="Client Info" titleIcon={PersonIcon}>
      {client ? (
        <>
          <Box className="flex items-center gap-3">
            <Avatar className="bg-slate-100 text-slate-700">
              {clientName.charAt(0)}
            </Avatar>
            <Box className="min-w-0 flex-1">
              <Box className="flex items-center gap-1">
                <Typography className="font-semibold text-slate-900">
                  {clientName}
                </Typography>
                {showOpenButton && (
                  <IconButton
                    href={`/clients/${client.id}`}
                    target="_blank"
                    size="small"
                    disableRipple
                    className="flex h-5 w-5 items-center justify-center text-gray-400 p-0 hover:text-primary"
                  >
                    <OpenInNewIcon className="h-4.5 w-4.5" />
                  </IconButton>
                )}
              </Box>
              {client.email && (
                <InfoRow icon={EmailIcon} href={`mailto:${client.email}`}>
                  {client.email}
                </InfoRow>
              )}
              {client.phone && (
                <InfoRow
                  icon={PhoneIcon}
                  onIconClick={() => window.open(`tel:${client.phone}`)}
                >
                  {client.phone}
                </InfoRow>
              )}
              {client.address && (
                <InfoRow icon={LocationIcon}>{client.address}</InfoRow>
              )}
            </Box>
          </Box>
          {client.description && (
            <>
              <Divider className="my-3" />
              <Typography className="text-xs text-gray-600 italic">
                &ldquo;{client.description}&rdquo;
              </Typography>
            </>
          )}
        </>
      ) : (
        <Typography className="text-sm text-gray-500">
          Client information not available.
        </Typography>
      )}
    </BaseCard>
  );
}
