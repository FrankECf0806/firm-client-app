"use client";

import { Box, TextField } from "@mui/material";
import { QuickAcessFormProps } from "@/types/form";
import { Controller, useForm } from "react-hook-form";
import { ClientFormValues } from "@/types/client";
import { DialogForm } from "@/components/dialogs/DialogForm";
import { ClientType } from "@/enums/client";
import { ResettableSelect } from "@/components/ui/input/ResettableSelect";
import { useEffect } from "react";

export function ClientForm({
  mode,
  open,
  onClose,
  formData,
}: QuickAcessFormProps<ClientFormValues>) {
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
      status: undefined,
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
      status: undefined,
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
    console.log(`SUBMIT - ${mode}`, data);
    await new Promise((r) => setTimeout(r, 1000));
    reset();
    onClose();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <DialogForm
      open={open}
      onClose={handleCancel}
      title={title}
      subtitle={subtitle}
      submitLabel={submitLabel}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
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
              placeholder="e.g. jhonsmith@gmail.com"
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
            // required: "Phone number is required",
            pattern: {
              // Allows digits, spaces, +, -, parentheses
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
              placeholder="e.g. 07720123456"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Box>

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Company */}
        <Controller
          name="company"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="input-rounded-firm"
              size="small"
              label="Company (optional)"
              placeholder="e.g. SoloLawyer"
              fullWidth
            />
          )}
        />

        {/* Client Type */}
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
              resetLabel="All Types"
            />
          )}
        />
      </Box>

      {/* Address */}
      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="input-rounded-firm"
            label="Address"
            placeholder="e.g. 123 Main Street, London, SW1A 1AA"
            fullWidth
          />
        )}
      />

      {/* Notes */}
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
