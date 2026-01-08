import {
  Badge,
  Box,
  Divider,
  IconButton,
  Menu,
  Typography,
} from "@mui/material";
import {
  ArticleOutlined,
  CalendarMonthOutlined,
  Notifications as NotificationsIcon,
  ScheduleOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import type { Notification } from "@/types/layout";
import { NotificationType } from "@/enums/layout";
import { useState } from "react";

const { DEADLINE, CASE, DOCUMENT, REMINDER } = NotificationType;
const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "Filing Deadline Tomorrow",
    description: "Garcia Immigration case - Form I-130",
    time: "2 hours ago",
    type: DEADLINE,
    read: false,
  },
  {
    id: 2,
    title: "New Document Uploaded",
    description: "Contract Agreement added to Davis Corp Merger",
    time: "4 hours ago",
    type: DOCUMENT,
    read: false,
  },
  {
    id: 3,
    title: "Hearing Reminder",
    description: "Smith vs. Johnson - Courtroom 3A at 9:00 AM",
    time: "Yesterday",
    type: REMINDER,
    read: false,
  },
  {
    id: 4,
    title: "Case Status Updated",
    description: "Estate of Williams moved to Active",
    time: "Yesterday",
    type: CASE,
    read: true,
  },
  {
    id: 5,
    title: "Time Entry Reminder",
    description: "You have 3 unbilled hours from last week",
    time: "2 days ago",
    type: REMINDER,
    read: true,
  },
];

const getIcon = (type: Notification["type"]) => {
  switch (type) {
    case DEADLINE:
      return <ScheduleOutlined className="w-4 h-4 text-red-600" />;
    case CASE:
      return <WorkOutlineOutlined className="w-4 h-4 text-blue-600" />;
    case DOCUMENT:
      return <ArticleOutlined className="w-4 h-4 text-blue-500" />;
    case REMINDER:
      return <CalendarMonthOutlined className="w-4 h-4 text-amber-600" />;
  }
};

export function Notifications() {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleMarkNotificationAsRead = (notification: Notification) => () => {
    if (!notification.read) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n)),
      );
    }
  };

  return (
    <>
      <IconButton
        className="text-primary"
        size="large"
        aria-label="notifications"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Badge badgeContent={unreadCount} variant="dot" color="primary">
          <NotificationsIcon className="w-6 h-6" />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            className: "w-80 p-0 rounded-xl border border-gray-100 bg-white",
            elevation: 12,
          },
        }}
      >
        {/* Header */}
        <Box className="flex items-center justify-between px-4 py-2 w-80 max-w-sm border-b border-primary">
          <Typography variant="body2" className="font-semibold text-primary">
            Notifications
          </Typography>

          {unreadCount > 0 && (
            <span
              className="
                                text-xs 
                                hover:text-white
                                hover:font-semibold
                                hover:bg-primary
                                focus:bg-primary
                                active:bg-primary
                                active:text-white
                                px-2 
                                py-1 
                                rounded
                                cursor-pointer"
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </span>
          )}
        </Box>
        {/* Content List */}
        <Box className="max-h-96 overflow-y-auto w-80 max-w-sm">
          {notifications.length === 0 ? (
            /* No notifications */
            <Typography
              variant="body2"
              className="p-4 text-center text-gray-500"
            >
              <NotificationsIcon className="w-6 h-6 opacity-50" />
              No notifications
            </Typography>
          ) : (
            /* Notifications list */
            notifications.map((notification) => (
              <Box
                key={notification.id}
                className={`
                                        p-3
                                        transition-colors
                                        hover:bg-muted/50
                                        cursor-pointer
                                        border-b
                                        border-primary/15
                                        ${!notification.read ? "bg-primary/5" : ""}
                                    `}
                onClick={handleMarkNotificationAsRead(notification)}
              >
                <Box className="flex items-start gap-3">
                  {/* Icon */}
                  <Box className="mt-0.5">{getIcon(notification.type)}</Box>
                  <Box className="flex-1 min-w-0">
                    {/* Title */}
                    <p
                      className={`
                                                font-medium
                                                text-sm
                                                ${!notification.read ? "text-gray-700" : "text-gray-400"}
                                            `}
                    >
                      {notification.title}
                    </p>
                    {/* Description */}
                    <p className="text-xs text-gray-500 truncate">
                      {notification.description}
                    </p>
                    {/* Time */}
                    <p className="text-xs text-gray-400 mt-1">
                      {notification.time}
                    </p>
                  </Box>
                </Box>
              </Box>
            ))
          )}
        </Box>
        <Divider />
        {/* Footer */}
        <Box className="p-2 flex justify-center">
          <span
            className="
                                w-full
                                text-center
                                text-sm
                                hover:text-white
                                hover:font-semibold
                                hover:bg-primary
                                focus:bg-primary
                                active:bg-primary
                                active:text-white
                                px-2
                                py-2
                                rounded
                                cursor-pointer"
          >
            View All Notifications
          </span>
        </Box>
      </Menu>
    </>
  );
}
