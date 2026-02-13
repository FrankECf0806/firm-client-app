"use client";

import { Button, TextField, MenuItem, Box } from "@mui/material";
import { PersonAddAltOutlined, DeleteOutline } from "@mui/icons-material";
import { CaseFormValues } from "@/types/case";
import { useForm, Controller } from "react-hook-form";
import { QuickAcessFormProps } from "@/types/form";
import { DialogForm } from "@/components/dialogs/DialogForm";
import { CasePracticeArea, CasePriority } from "@/enums/case";
import { useEffect } from "react";
import { useAppContext } from "@/providers/AppProvider";
import { formValuesToCaseUpdate } from "@/mappers/case.mapper";

export function CaseForm({
  mode,
  open,
  onClose,
  formData,
}: QuickAcessFormProps<CaseFormValues>) {
  const { clients, addCase, updateCase, deleteCase } = useAppContext();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CaseFormValues>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      clientId: "",
      practiceArea: undefined,
      priority: undefined,
      status: "ACTIVE",
      openedAt: "",
      nextDeadline: "",
      description: "",
    },
  });

  useEffect(() => {
    if (!open) return;

    reset({
      title: "",
      clientId: "",
      practiceArea: undefined,
      priority: undefined,
      status: "ACTIVE",
      openedAt: new Date().toISOString().split("T")[0],
      nextDeadline: "",
      description: "",
      ...formData,
    });
  }, [open, formData, reset]);

  const title = mode === "create" ? "Create New Case" : "Edit Case";
  const subtitle =
    mode === "create"
      ? "Fill in the details below to create a new legal case."
      : "Update the details of this case.";
  const submitLabel = mode === "create" ? "Create Case" : "Save Changes";

  const onSubmit = async (data: CaseFormValues) => {
    if (mode === "create") {
      // Create new case with default status ACTIVE
      addCase({
        ...data,
      });
      console.log("Case created:", data);
    } else if (mode === "edit" && formData?.id) {
      // Update existing case
      const updates = formValuesToCaseUpdate(data);
      updateCase(formData.id, updates);
      console.log("Case updated:", formData.id);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
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
      `Are you sure you want to delete case "${formData.title}"? This action cannot be undone.`,
    );

    if (confirmed) {
      try {
        await deleteCase(formData.id);
        onClose();
      } catch (error) {
        console.error("Error deleting case:", error);
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  // Delete button component
  const dangerAction =
    mode === "edit" ? (
      <Button
        variant="outlined"
        color="error"
        startIcon={<DeleteOutline />}
        onClick={handleDelete}
        disabled={isSubmitting}
        className="button-firm w-full hover:bg-red-500 hover:text-white"
      >
        {isSubmitting ? "Deleting..." : "Delete Case"}
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
      {/* Case Title */}
      <Controller
        name="title"
        control={control}
        rules={{ required: "Case title is required" }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            className="input-rounded-firm"
            size="small"
            label="Case Title"
            placeholder="e.g. Smith v. Johnson Contract Dispute"
            fullWidth
            required
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Client */}
        <Controller
          name="clientId"
          control={control}
          rules={{ required: "Client is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              className="input-rounded-firm"
              size="small"
              select
              label="Client"
              fullWidth
              required
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            >
              <MenuItem
                className="place-content-center hover:bg-primary p-0 min-h-0.5"
                value="create"
              >
                <Button
                  type="button"
                  className="w-full gap-2 hover:text-white"
                  onClick={() => alert("Open Create New Client Dialog")}
                >
                  <PersonAddAltOutlined className="text-xl" />
                  <span>Create New Client</span>
                </Button>
              </MenuItem>
              {clients.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.firstName} {c.lastName}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        {/* Practice Area */}
        <Controller
          name="practiceArea"
          control={control}
          rules={{ required: "Practice area is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              className="input-rounded-firm"
              select
              size="small"
              label="Practice Area"
              fullWidth
              required
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            >
              {Object.keys(CasePracticeArea).map((type) => (
                <MenuItem key={type} value={type}>
                  {CasePracticeArea[type as keyof typeof CasePracticeArea]}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Box>

      {/* Description */}
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="input-rounded-firm"
            label="Description"
            placeholder="e.g. Breach of contract case involving non-payment for services rendered..."
            multiline
            rows={3}
            fullWidth
          />
        )}
      />

      {/* Dates */}
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          name="openedAt"
          control={control}
          rules={{ required: "Filing date is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              className={`input-rounded-firm ${mode === "edit" ? "bg-gray-100 rounded-2xl" : ""}`}
              label="Filing Date"
              type="date"
              size="small"
              required
              disabled={mode === "edit"}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              slotProps={{ inputLabel: { shrink: true } }}
              fullWidth
            />
          )}
        />

        <Controller
          name="nextDeadline"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="input-rounded-firm"
              label="Next Deadline"
              type="date"
              size="small"
              slotProps={{ inputLabel: { shrink: true } }}
              fullWidth
            />
          )}
        />
      </Box>

      {/* Priority */}
      <Controller
        name="priority"
        control={control}
        rules={{ required: "Case priority is required" }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            className="input-rounded-firm"
            size="small"
            select
            label="Priority"
            fullWidth
            required
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          >
            {Object.keys(CasePriority).map((p) => (
              <MenuItem key={p} value={p}>
                {CasePriority[p as keyof typeof CasePriority]}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      {/* Hidden status field */}
      <input type="hidden" {...control.register("status")} />
    </DialogForm>
  );
}
