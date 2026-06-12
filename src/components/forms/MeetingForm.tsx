"use client";

import { TextField, Box, MenuItem } from "@mui/material";
import { Link as LinkIcon } from "@mui/icons-material";
import { MeetingType } from "@/enums/meeting";
import { MEETING_STATUS_CONFIG } from "@/utils/constant/meeting";
import { useForm, Controller, useWatch } from "react-hook-form";
import { QuickAcessFormProps } from "@/types/form";
import { DialogForm } from "@/components/dialogs/DialogForm";
import { useEffect } from "react";
import { useAppContext } from "@/providers/AppProvider";
import {
  MeetingFilterStatus,
  MeetingFormValues,
  MeetingStatusKey,
} from "@/types/meeting";
import { DialogChipConfig } from "@/types/global";
import { fromDateTimeLocal, toDateTimeLocal } from "@/utils/date";

export function MeetingForm({
  mode,
  open,
  onClose,
  formData,
}: QuickAcessFormProps<MeetingFormValues>) {
  const { meetings, cases } = useAppContext();
  const { addMeeting, updateMeeting, deleteMeeting } = meetings;
  const { cases: caseList } = cases;

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm<MeetingFormValues>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      caseId: "",
      start: "",
      end: "",
      status: "SCHEDULED",
      type: "CLIENT_MEETING",
      meetingLink: "",
      location: "",
      attendees: [],
      agenda: "",
      notes: "",
    },
  });

  const status = useWatch({
    control,
    name: "status",
    defaultValue: "SCHEDULED",
  });

  const chipConfigStatus: DialogChipConfig<MeetingFilterStatus> = {
    value: status,
    config: MEETING_STATUS_CONFIG,
    onChange: (key: MeetingFilterStatus) =>
      setValue("status", key as MeetingStatusKey),
  };

  // Reset form when dialog opens
  useEffect(() => {
    if (!open) return;

    if (mode === "create") {
      const now = new Date();

      const start = new Date(now);
      const end = new Date(now.getTime() + 30 * 60000);

      reset({
        title: "",
        caseId: "",
        status: "SCHEDULED",
        start: toDateTimeLocal(start),
        end: toDateTimeLocal(end),
        type: "CLIENT_MEETING",
        meetingLink: "",
        location: "",
        attendees: [],
        agenda: "",
        notes: "",
      });
    } else if (mode === "edit" && formData) {
      reset({
        ...formData,
        start: formData.start ? toDateTimeLocal(formData.start) : "",
        end: formData.end ? toDateTimeLocal(formData.end) : "",
        attendees: formData.attendees || [],
      });
    }
  }, [open, mode, formData, reset]);

  const onSubmit = async (data: MeetingFormValues) => {
    const meetingPayload = {
      ...data,
      start: fromDateTimeLocal(data.start),
      end: fromDateTimeLocal(data.end),
      attendees: data.attendees || [],
      location: data.location || "",
      agenda: data.agenda || "",
      notes: data.notes || "",
    };

    if (mode === "create") {
      addMeeting(meetingPayload);
    } else if (mode === "edit" && formData?.id) {
      updateMeeting(formData.id, meetingPayload);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    reset();
    onClose();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  const handleDelete = async () => {
    if (!formData?.id) return;
    await deleteMeeting(formData.id);
    onClose();
  };

  const title = mode === "create" ? "Create New Meeting" : "Edit Meeting";
  const subtitle =
    mode === "create"
      ? "Fill in the details to create a new meeting."
      : "Update the details of your meeting.";
  const submitLabel = mode === "create" ? "Create Meeting" : "Save Changes";

  const onDelete = mode === "edit" ? handleDelete : undefined;
  const chipConfig = mode === "edit" ? chipConfigStatus : undefined;

  return (
    <DialogForm<MeetingFilterStatus>
      open={open}
      onClose={handleCancel}
      title={title}
      subtitle={subtitle}
      submitLabel={submitLabel}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
      chipConfig={chipConfig}
      onDelete={onDelete}
      deleteEntityName="meeting"
    >
      {/* Meeting Title */}
      <Controller
        name="title"
        control={control}
        rules={{ required: "Meeting title is required" }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            className="input-rounded-firm"
            size="small"
            label="Meeting Title"
            placeholder="e.g., Client Strategy Session"
            fullWidth
            required
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      {/* Meeting Type */}
      <Controller
        name="type"
        control={control}
        rules={{ required: "Meeting type is required" }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            className="input-rounded-firm"
            select
            size="small"
            label="Meeting Type"
            fullWidth
            required
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          >
            {Object.keys(MeetingType).map((type) => (
              <MenuItem key={type} value={type}>
                {MeetingType[type as keyof typeof MeetingType]}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Start DateTime */}
        <Controller
          name="start"
          control={control}
          rules={{ required: "Start time is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              className="input-rounded-firm"
              size="small"
              label="Start"
              type="datetime-local"
              fullWidth
              required
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          )}
        />

        {/* End DateTime */}
        <Controller
          name="end"
          control={control}
          rules={{ required: "End time is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              className="input-rounded-firm"
              size="small"
              label="End"
              type="datetime-local"
              fullWidth
              required
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          )}
        />
      </Box>

      {/* Location */}
      <Controller
        name="location"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="input-rounded-firm"
            size="small"
            label="Location"
            placeholder="e.g., Conference Room A, Zoom, etc."
            fullWidth
          />
        )}
      />

      {/* Meeting Link */}
      <Controller
        name="meetingLink"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="input-rounded-firm"
            size="small"
            label="Meeting Link (Google Meet / Zoom)"
            placeholder="https://meet.google.com/xxx-xxxx-xxx"
            fullWidth
            InputProps={{
              startAdornment: (
                <LinkIcon fontSize="small" className="mr-2 text-gray-400" />
              ),
            }}
          />
        )}
      />

      {/* Associated Case */}
      <Controller
        name="caseId"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="input-rounded-firm"
            select
            size="small"
            label="Associated Case (optional)"
            fullWidth
          >
            <MenuItem value="">None</MenuItem>
            {caseList.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.title}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      {/* Attendees (comma separated) */}
      <Controller
        name="attendees"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="input-rounded-firm"
            size="small"
            label="Attendees (comma separated)"
            placeholder="e.g., John Attorney, Sarah Paralegal"
            fullWidth
            value={field.value?.join(", ") || ""}
            onChange={(e) =>
              field.onChange(
                e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              )
            }
          />
        )}
      />

      {/* Agenda */}
      <Controller
        name="agenda"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="input-rounded-firm"
            label="Agenda"
            placeholder="e.g., Discuss settlement terms, review discovery"
            multiline
            rows={2}
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
            label="Notes (internal)"
            placeholder="Any internal notes or reminders"
            multiline
            rows={2}
            fullWidth
          />
        )}
      />
    </DialogForm>
  );
}
