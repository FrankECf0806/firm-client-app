import {
  AppBar,
  Avatar,
  Box,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import {
  getCurrentDateFormatted,
  getLocalTimeBasedGreeting,
} from "@/utils/time";
import { Notifications } from "./Notifications";

import { user, firm } from "@/mock_data";

export function Header() {
  return (
    <>
      <AppBar
        className="bg-white border-b border-divider"
        position="sticky"
        elevation={2}
      >
        <Toolbar className="text-primary px-2 md:px-4 lg:px-6 py-4 min-h-18 gap-2 sm:gap-4">
          {/* Header content */}
          <Box className="flex flex-col flex-1">
            <Typography
              className="
                py-1
                font-semibold
                leading-none
                text-foreground 
                text-xl
                lg:text-2xl"
            >
              Good {getLocalTimeBasedGreeting()},{" "}
              <Box className="text-muted-foreground" component="span">
                {user.firstName}
              </Box>
            </Typography>
            <Typography className="text-xs lg:text-sm">
              {getCurrentDateFormatted()}
            </Typography>
          </Box>

          {/* Desktop Search */}
          <Box className="flex items-center gap-2">
            <Box className="relative hidden md:block">
              <Box
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  pointer-events-none"
              >
                <Search fontSize="small" />
              </Box>
              <InputBase
                onClick={() => console.log("Open search modal")}
                className="
                  rounded-lg
                  md:w-40
                  lg:w-64
                  border
                  border-transparent
                  cursor-pointer
                  pl-10
                  pr-3
                  py-1.5
                  bg-primary/10
                  hover:border
                  hover:border-primary/75
                  hover:bg-primary/2
                  focus:border-primary"
                placeholder="Search cases, clients… (⌘K)"
                readOnly
              />
            </Box>
          </Box>
          {/* Mobile Search */}
          <Box className="inline-flex md:hidden">
            <Search
              fontSize="medium"
              onClick={() => console.log("Open search modal")}
              className="cursor-pointer"
            />
          </Box>

          {/* Notifications */}
          <Box className="flex items-center border-r-2">
            <Notifications />
          </Box>

          {/* Avatar */}
          <Box className="flex items-center gap-2">
            <Avatar
              className="border w-15 h-15"
              alt={`${user.firstName} ${user.lastName}`}
              src={`${user.src}`}
            >
              {user.firstName.charAt(0)}
              {user.lastName.charAt(0)}
            </Avatar>
            <Box className="flex-col leading-none hidden sm:block">
              <Typography
                className="whitespace-nowrap font-semibold m-0 p-0"
                variant="body2"
              >
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user.role.charAt(0) + user.role.slice(1).toLowerCase()} at{" "}
                {firm.name}
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
