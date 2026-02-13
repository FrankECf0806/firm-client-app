"use client";

import { Box, TextField, Button } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { QuickAcessFormProps } from "@/types/form";
import { Controller, useForm } from "react-hook-form";
import { ClientFormValues } from "@/types/client";
import { DialogForm } from "@/components/dialogs/DialogForm";
import { ClientType } from "@/enums/client";
import { ResettableSelect } from "@/components/ui/input/ResettableSelect";
import { useEffect } from "react";
import { useAppContext } from "@/providers/AppProvider";

export function ClientForm({
  mode,
  open,
  onClose,
  formData,
}: QuickAcessFormProps<ClientFormValues>) {
  const { addClient, updateClient, deleteClient } = useAppContext();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ClientFormValues>({
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      phone: "",
      address: "",
      type: undefined,
      description: "",
    },
  });

  useEffect(() => {
    if (!open) return;

    reset({
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      phone: "",
      address: "",
      type: undefined,
      description: "",
      ...formData,
    });
  }, [open, formData, reset]);

  const title = mode === "create" ? "Add New Client" : "Edit Client";
  const subtitle =
    mode === "create"
      ? "Fill in the details below to add a new client to your practice."
      : "Update the details of this client.";
  const submitLabel = mode === "create" ? "Add Client" : "Save Changes";

  const onSubmit = async (data: ClientFormValues) => {
    if (mode === "create") {
      addClient({
        ...data,
      });
    } else if (mode === "edit" && formData?.id) {
      updateClient(formData.id, data);
    }

    await new Promise((r) => setTimeout(r, 1000));
    reset();
    onClose();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  const handleDelete = async () => {
    if (!formData?.id) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete client "${formData.firstName} ${formData.lastName}"? This action cannot be undone.`,
    );

    if (confirmed) {
      try {
        await deleteClient(formData.id);
        onClose();
      } catch (error) {
        console.error("Error deleting client:", error);
      }
    }
  };

  // Delete button component (only in edit mode)
  const dangerAction =
    mode === "edit" ? (
      <Button
        color="error"
        startIcon={<DeleteOutline />}
        onClick={handleDelete}
        disabled={isSubmitting}
        variant="outlined"
        className="button-firm w-full hover:bg-red-500 hover:text-white"
      >
        {isSubmitting ? "Deleting..." : "Delete Client"}
      </Button>
    ) : undefined;

  return (
    <DialogForm
      open={open}
      onClose={handleCancel}
      title={title}
      subtitle={subtitle}
      submitLabel={submitLabel}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
      dangerAction={dangerAction}
    >
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <Controller
          name="firstName"
          control={control}
          rules={{ required: "First Name is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              className="input-rounded-firm"
              size="small"
              label="First Name"
              placeholder="e.g. John"
              fullWidth
              required
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        {/* Last Name */}
        <Controller
          name="lastName"
          control={control}
          rules={{ required: "Last Name is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              className="input-rounded-firm"
              size="small"
              label="Last Name"
              placeholder="e.g. Smith"
              fullWidth
              required
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Box>

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Email */}
        <Controller
          name="email"
          control={control}
          rules={{
            // required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              className="input-rounded-firm"
              size="small"
              label="Email"
              placeholder="e.g. john.smith@example.com"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        {/* Phone */}
        <Controller
          name="phone"
          control={control}
          rules={{
            pattern: {
              // required: "Phone number is required",
              value: /^[0-9+\-\s()]{7,20}$/,
              message: "Enter a valid phone number",
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              className="input-rounded-firm"
              size="small"
              label="Phone"
              placeholder="e.g. (555) 123-4567"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Box>

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          name="company"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="input-rounded-firm"
              size="small"
              label="Company (optional)"
              placeholder="e.g. Smith Enterprises"
              fullWidth
            />
          )}
        />
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <ResettableSelect
              {...field}
              className="input-rounded-firm w-full"
              label="Client Type"
              value={field.value}
              onChange={field.onChange}
              options={ClientType}
              resetValue=""
              resetLabel="Select type"
            />
          )}
        />
      </Box>

      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="input-rounded-firm"
            label="Address"
            placeholder="e.g. 123 Main St, New York, NY 10001"
            fullWidth
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="input-rounded-firm"
            label="Description"
            placeholder="e.g. Client prefers email communication, important deadlines..."
            multiline
            rows={3}
            fullWidth
          />
        )}
      />
    </DialogForm>
  );
}
