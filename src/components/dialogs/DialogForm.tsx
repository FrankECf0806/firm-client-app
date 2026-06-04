"use client";

import {
  Button,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import { GlobalDialog } from "@/components/dialogs/GlobalDialog";
import { useRef, useState } from "react";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { DialogFormProps, headerMenuItem } from "@/types/global";
import { ConfirmDialog } from "./ConfirmDialog";

export function DialogForm<T extends string = string>({
  open,
  onClose,
  title,
  subtitle,
  chipConfig,
  headerMenuItems,
  onSubmit,
  isSubmitting,
  submitLabel,
  onDelete,
  deleteEntityName,
  children,
}: DialogFormProps<T>) {
  const formRef = useRef<HTMLFormElement>(null);
  const [statusAnchor, setStatusAnchor] = useState<null | HTMLElement>(null);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const hasMenu =
    (headerMenuItems && headerMenuItems.length > 0) || Boolean(onDelete);

  const handleItemClick = (item: headerMenuItem) => {
    setMenuAnchor(null);
    item.onClick();
  };

  const handleDeleteClick = () => {
    setMenuAnchor(null);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete?.();
    } finally {
      setIsDeleting(false);
      setConfirmOpen(false);
    }
  };

  const headerChip = chipConfig ? (
    <>
      <Chip
        clickable
        size="small"
        color={chipConfig.config[chipConfig.value]?.styling?.color ?? "default"}
        label={chipConfig.config[chipConfig.value]?.label ?? chipConfig.value}
        onClick={(e) => setStatusAnchor(e.currentTarget)}
      />

      <Menu
        anchorEl={statusAnchor}
        open={Boolean(statusAnchor)}
        onClose={() => setStatusAnchor(null)}
        slotProps={{
          paper: {
            className: "shadow-lg rounded-lg mt-1",
          },
        }}
      >
        {(
          Object.entries(chipConfig.config) as [
            T,
            (typeof chipConfig.config)[T],
          ][]
        )
          .filter(
            ([key]) =>
              !String(key).startsWith("ALL_") && key !== chipConfig.value,
          )
          .map(([key, option]) => {
            return (
              <MenuItem
                key={key}
                onClick={() => {
                  chipConfig.onChange(key);
                  setStatusAnchor(null);
                }}
                dense
                className={`${option.styling?.selectedClass} transition-colors duration-150 rounded-lg`}
              >
                <Box className="flex items-center gap-2 w-full">
                  <Typography variant="body2" className="flex-1">
                    {option.label}
                  </Typography>
                </Box>
              </MenuItem>
            );
          })}
      </Menu>
    </>
  ) : null;

  const headerMenu = hasMenu ? (
    <>
      <IconButton
        size="small"
        onClick={(e) => setMenuAnchor(e.currentTarget)}
        className="hover:bg-primary/10"
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
      >
        {headerMenuItems?.map((item, index) => (
          <MenuItem
            key={index}
            disabled={item.disabled}
            onClick={() => handleItemClick(item)}
            className={`${item.className} hover:bg-primary/10 transition-colors duration-150`}
            dense
          >
            {item.label}
          </MenuItem>
        ))}

        {headerMenuItems && headerMenuItems.length > 0 && onDelete && (
          <Divider />
        )}

        {onDelete && (
          <MenuItem
            onClick={handleDeleteClick}
            className="text-red-600 hover:bg-red-50 transition-colors duration-150"
            dense
          >
            Delete {deleteEntityName ?? "Item"}
          </MenuItem>
        )}
      </Menu>
    </>
  ) : null;

  const footerActions = (
    <>
      <Button
        type="button"
        variant="outlined"
        className="button-firm"
        onClick={onClose}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        className="button-firm"
        variant="contained"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </Button>
    </>
  );

  return (
    <>
      <GlobalDialog
        open={open}
        onClose={onClose}
        title={title}
        subtitle={subtitle}
        footerActions={footerActions}
        headerChip={headerChip}
        headerMenu={headerMenu}
        formProps={{
          ref: formRef,
          onSubmit,
          noValidate: true,
        }}
        disableBackdropClose
      >
        {children}
      </GlobalDialog>
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title={`Delete ${deleteEntityName ?? "item"}`}
        description={`Are you sure you want to delete this ${deleteEntityName ?? "item"}? This action cannot be undone.`}
        confirmText="Delete"
        confirmColor="error"
        loading={isDeleting}
      />
    </>
  );
}
