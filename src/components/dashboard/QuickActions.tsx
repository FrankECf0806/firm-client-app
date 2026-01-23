"use client";

import { Box, Button, Grid } from "@mui/material";
import {
  AddOutlined,
  PersonAddAltOutlined,
  // UploadFileOutlined,
  LocalAtmOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NewCaseForm from "../forms/NewCaseForm";
import AddClientForm from "../forms/AddClientForm";

export default function QuickActions() {
  const [newCaseOpen, setNewCaseOpen] = useState(false);
  const [addClientOpen, setAddClientOpen] = useState(false);
  // const [uploadDocOpen, setUploadDocOpen] = useState(false);

  const router = useRouter();

  const navigate = (path: string) => {
    router.push(path);
  };

  const actions = [
    {
      title: "New Case",
      variant: "contained",
      icon: AddOutlined,
      onClick: () => setNewCaseOpen(true),
    },
    {
      title: "Add Client",
      variant: "outlined",
      icon: PersonAddAltOutlined,
      onClick: () => setAddClientOpen(true),
    },
    // { title: "Upload Document", variant: "outlined", icon: UploadFileOutlined, onClick: () => setUploadDocOpen(true) },
    {
      title: "Generate Invoice",
      variant: "outlined",
      icon: LocalAtmOutlined,
      onClick: () => navigate("/billing"),
    },
  ];

  return (
    <Box>
      <Grid
        container
        spacing={1.5}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        {actions.map((action) => (
          <Grid
            key={action.title}
            size={{ xs: 6, sm: "auto" }}
            className="flex justify-start"
          >
            <Button
              variant={action.variant as "contained" | "outlined"}
              className="
				w-full
				gap-2
				py-1.25 px-3
				rounded-md
				shadow-sm
				sm:tracking-tighter
				hover:bg-primary
				hover:text-white
				hover:shadow-lg
				hover:translate-x-0.5
				transition-all
				duration-150
				ease-in-out
				tracking-normal"
              onClick={action.onClick}
            >
              <action.icon className="w-4 h-4" />
              <span className="text-[0.75rem] sm:text-sm">{action.title}</span>
            </Button>
          </Grid>
        ))}
      </Grid>
      <NewCaseForm open={newCaseOpen} onClose={() => setNewCaseOpen(false)} />
      <AddClientForm
        open={addClientOpen}
        onClose={() => setAddClientOpen(false)}
      />
    </Box>
  );
}
