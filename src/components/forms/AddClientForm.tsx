"use client";

import { Box, MenuItem, TextField } from "@mui/material";
import { QuickAcessFormProps } from "@/types/form";
import { Controller, useForm } from "react-hook-form";
import { AddClientFormValues } from "@/types/client";
import { DialogForm } from "@/components/dialogs/DialogForm";
import { ClientType } from "@/enums/client";

export default function AddClientForm({ open, onClose }: QuickAcessFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<AddClientFormValues>({
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      phone: "",
      address: "",
      clientType: "",
      notes: "",
    },
  });

  const onSubmit = async (data: AddClientFormValues) => {
    console.log("SUBMITTED", data);
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
      title="Add Client"
      subtitle="Add a new client to your practice. Fill in the details below."
      submitLabel="Add Client"
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
          name="clientType"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="input-rounded-firm"
              size="small"
              select
              label="Client Type"
              placeholder="Select client type"
              fullWidth
            >
              {Object.keys(ClientType).map((type) => (
                <MenuItem key={type} value={type}>
                  {ClientType[type as keyof typeof ClientType]}
                </MenuItem>
              ))}
            </TextField>
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
        name="notes"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="input-rounded-firm"
            label="Notes"
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
