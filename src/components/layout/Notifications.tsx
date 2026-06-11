"use client";

import {
  Badge,
  Box,
  Divider,
  IconButton,
  Menu,
  Typography,
  Button,
} from "@mui/material";
import {
  ArticleOutlined,
  CalendarMonthOutlined,
  ChatOutlined,
  Notifications as NotificationsIcon,
  ScheduleOutlined,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useCallback, useMemo, useState } from "react";
import { Notification } from "@/types/notification";
import { useNotifications } from "@/hooks/useNotifications";
import { formatRelativeTimeFromNow, getDateGroup } from "@/utils/date";

function getNotificationIcon(type: string) {
  switch (type) {
    case "DEADLINE":
      return <ScheduleOutlined className="text-red-500" />;
    case "MEETING":
      return <CalendarMonthOutlined className="text-amber-500" />;
    case "DOCUMENT":
      return <ArticleOutlined className="text-sky-500" />;
    case "COMMUNICATION":
      return <ChatOutlined className="text-violet-500" />;
    default:
      return <NotificationsIcon className="text-slate-500" />;
  }
}

export function Notifications() {
  const notificationList = useNotifications();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [readNotifications, setReadNotifications] = useState<
    Record<string, boolean>
  >({});
  const open = Boolean(anchorEl);

  const notifications = useMemo(() => {
    const severityRank: Record<string, number> = {
      CRITICAL: 0,
      HIGH: 1,
      MEDIUM: 2,
      LOW: 3,
    };

    return notificationList
      .map((n) => ({ ...n, read: readNotifications[n.id] ?? n.read }))
      .sort((a, b) => {
        const severityDiff =
          severityRank[a.severity] - severityRank[b.severity];
        if (severityDiff !== 0) return severityDiff;
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      })
      .slice(0, 10);
  }, [notificationList, readNotifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = useCallback(() => {
    const updated: Record<string, boolean> = {};
    notifications.forEach((n) => {
      updated[n.id] = true;
    });
    setReadNotifications(updated);
  }, [notifications]);

  const markAsRead = useCallback((id: string) => {
    setReadNotifications((prev) => ({ ...prev, [id]: true }));
  }, []);

  const groupedNotifications = useMemo(() => {
    return notifications.reduce(
      (acc, n) => {
        const group = getDateGroup(n.createdAt);
        if (!acc[group]) acc[group] = [];
        acc[group].push(n);
        return acc;
      },
      {} as Record<string, Notification[]>,
    );
  }, [notifications]);

  return (
    <>
      <IconButton
        className="text-primary hover:bg-primary/10 transition-colors"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Badge
          badgeContent={unreadCount > 99 ? "99+" : unreadCount}
          showZero={Boolean(unreadCount)}
          color="primary"
        >
          <NotificationsIcon className="w-6 h-6" />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {/* Header */}
        <Box
          className="
			flex
			items-center
			justify-between
			px-2 pr-1 sm:px-4 
			sm:py-2
			w-80 max-w-sm
			border-b border-gray-100
		  "
        >
          <Typography
            variant="subtitle2"
            className="font-semibold text-primary"
          >
            Notifications
          </Typography>
          <Box className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button
                size="small"
                onClick={markAllAsRead}
                className="text-xs text-primary hover:bg-primary/10 normal-case"
              >
                Mark all read
              </Button>
            )}
            <IconButton
              size="small"
              onClick={() => setAnchorEl(null)}
              className="hover:bg-primary/10 block sm:hidden"
            >
              <CloseIcon fontSize="small" className="text-gray-500" />
            </IconButton>
          </Box>
        </Box>

        {/* Notifications list */}
        <Box
          className="
		  	kanban-scroll
			max-h-96
			overflow-y-auto
			w-80 max-w-sm
		  "
        >
          {notifications.length === 0 ? (
            <Box className="flex flex-col items-center justify-center py-12 px-6">
              <NotificationsIcon className="text-gray-300 text-5xl" />
              <Typography
                variant="body2"
                className="mt-3 text-gray-500 font-medium"
              >
                You&apos;re all caught up
              </Typography>
              <Typography variant="caption" className="text-gray-400">
                No new notifications
              </Typography>
            </Box>
          ) : (
            Object.entries(groupedNotifications).map(([group, items]) => (
              <Box key={group}>
                {/* Group header */}
                <Box
                  className="
					sticky
					top-0
					z-10
					bg-gray-50
					border-y
					border-gray-100
					px-4 py-2
				"
                >
                  <Typography
                    variant="caption"
                    className="font-semibold text-slate-600"
                  >
                    {group}
                  </Typography>
                </Box>

                {items.map((notification) => (
                  <Box
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={`
                      cursor-pointer
					  border-b
					  border-gray-100
					  px-4
					  py-1.5
                      transition-all
					  hover:bg-primary/15
                      ${!notification.read ? "bg-primary/5" : ""}
                    `}
                  >
                    <Box className="flex gap-3">
                      {/* Icon */}
                      <Box className="mt-0.5 shrink-0">
                        {getNotificationIcon(notification.type)}
                      </Box>

                      {/* Content */}
                      <Box className="flex-1 min-w-0">
                        <Box
                          className="
							flex
							items-start
							justify-between
							gap-1
						  "
                        >
                          <Typography
                            variant="body2"
                            className={`
								truncate
                              ${
                                notification.read
                                  ? "font-medium text-gray-700"
                                  : "font-semibold text-gray-900"
                              }
                            `}
                          >
                            {notification.title}
                          </Typography>
                          {!notification.read && (
                            <Box
                              className="
								w-2
								h-2
								rounded-full
								bg-primary
								mt-1.5
								shrink-0
								"
                            />
                          )}
                        </Box>
                        <Typography
                          variant="caption"
                          className="
						  	block
							truncate
							text-gray-600
							line-clamp-2
							"
                        >
                          {notification.subtitle}
                        </Typography>
                        {notification.showTimestamp && (
                          <Typography
                            variant="caption"
                            className="
							block
							text-gray-400
							"
                          >
                            {formatRelativeTimeFromNow(notification.createdAt)}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            ))
          )}
        </Box>

        <Divider />
        <Box className="p-2">
          <Button
            fullWidth
            size="small"
            className="
			font-semibold
			text-center
			text-primary
			hover:bg-primary/10
			normal-case
			text-sm
			"
            onClick={() => {
              setAnchorEl(null);
              console.log("View all notifications");
            }}
          >
            View all notifications
          </Button>
        </Box>
      </Menu>
    </>
  );
}
