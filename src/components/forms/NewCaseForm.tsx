"use client";

import { Button, TextField, MenuItem, Box } from "@mui/material";
import { GlobalDialog } from "@/components/dialogs/GlobalDialog";
import { CaseTypes, mockClients, PriorityLevels } from "@/mock_data";
import { PersonAddAltOutlined } from "@mui/icons-material";
import { NewCaseFormProps, NewCaseFormValues } from "@/types/case";
import { useForm, Controller } from "react-hook-form";
import { useRef } from "react";

export default function NewCaseForm({ open, onClose }: NewCaseFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<NewCaseFormValues>({
    mode: "onBlur",
    defaultValues: {
      caseTitle: "",
      client: "",
      caseType: "",
      priority: "",
      filingDate: "",
      deadline: "",
      description: "",
    },
  });

  const onSubmit = async (data: NewCaseFormValues) => {
    console.log("SUBMITTED", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
    onClose();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  const title = "Create New Case";
  const subtitle = "Fill in the details below to create a new legal case.";

  // Actions with submit button - now inside the form!
  const actions = (
    <>
      <Button
        type="button"
        variant="outlined"
        className="button-firm"
        onClick={handleCancel}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        className="button-firm"
        variant="contained"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating..." : "Create Case"}
      </Button>
    </>
  );

  return (
    <GlobalDialog
      open={open}
      onClose={handleCancel}
      title={title}
      subtitle={subtitle}
      actions={actions}
      formProps={{
        ref: formRef, // ref is passed inside formProps
        onSubmit: handleSubmit(onSubmit),
        noValidate: true,
      }}
      disableBackdropClose={true}
    >
      {/* Form content */}
      {/* Case Title */}
      <Controller
        name="caseTitle"
        control={control}
        rules={{ required: "Case title is required" }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            className="input-rounded-firm"
            size="small"
            label="Case Title"
            fullWidth
            required
            error={!!fieldState.error}
            helperText={fieldState.error?.message || " "}
          />
        )}
      />

      {/* Client & Case Type */}
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          name="client"
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
              helperText={fieldState.error?.message || " "}
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
              {mockClients.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="caseType"
          control={control}
          rules={{ required: "Case type is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              className="input-rounded-firm"
              select
              size="small"
              label="Case Type"
              fullWidth
              required
              error={!!fieldState.error}
              helperText={fieldState.error?.message || " "}
            >
              {Object.values(CaseTypes).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
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
            multiline
            rows={3}
            fullWidth
          />
        )}
      />

      {/* Dates */}
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          name="filingDate"
          control={control}
          rules={{ required: "Filing date is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              className="input-rounded-firm"
              label="Filing Date"
              type="date"
              size="small"
              required
              error={!!fieldState.error}
              helperText={fieldState.error?.message || " "}
              slotProps={{ inputLabel: { shrink: true } }}
              fullWidth
            />
          )}
        />

        <Controller
          name="deadline"
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
        rules={{ required: "Priority is required" }}
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
            helperText={fieldState.error?.message || " "}
          >
            {Object.values(PriorityLevels).map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </GlobalDialog>
  );
}
