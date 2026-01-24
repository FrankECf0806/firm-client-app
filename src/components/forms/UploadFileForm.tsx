"use client";

import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  MenuItem,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { DialogForm } from "@/components/dialogs/DialogForm";
import { QuickAcessFormProps } from "@/types/form";
import { DocumentType } from "@/enums/document";
import { mockCases } from "@/mock_data";
import { Document } from "@/types/document";
import { MAX_FILES } from "@/utils/constant";

/* -------------------------------- Types -------------------------------- */

type UploadItem = {
  file: File;
  type: string;
  hasError?: boolean;
};

type UploadFormValues = {
  caseId: string;
  description: string;
};

export default function UploadFileForm({ open, onClose }: QuickAcessFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [items, setItems] = useState<UploadItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<UploadFormValues>({
    mode: "onBlur",
    defaultValues: {
      caseId: "",
      description: "",
    },
  });

  const canAddMore = items.length < MAX_FILES;

  /* ---------------- File helpers ---------------- */

  const addFiles = (files: FileList) => {
    setFileError(null);

    const incoming = Array.from(files);

    if (items.length + incoming.length > MAX_FILES) {
      setFileError(`You can upload up to ${MAX_FILES} documents.`);
      return;
    }

    setItems((prev) => [
      ...prev,
      ...incoming.map((file) => ({ file, type: "" })),
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
    setFileError(null);
  };

  const handleTypeChange = (index: number, value: string) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, type: value, hasError: false } : item,
      ),
    );
  };

  /* ---------------- Dropzone handlers ---------------- */

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (canAddMore) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (canAddMore && e.dataTransfer.files) {
      addFiles(e.dataTransfer.files);
    }
  };

  const handleClickDropzone = () => {
    if (canAddMore) {
      inputRef.current?.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(e.target.files);
      e.target.value = "";
    }
  };

  /* ---------------- Submit ---------------- */

  const handleSubmitForm = async (data: UploadFormValues) => {
    if (items.length === 0) {
      setFileError("Please upload at least one document.");
      return;
    }

    const validated = items.map((item) => ({
      ...item,
      hasError: !item.type,
    }));

    setItems(validated);

    if (validated.some((i) => i.hasError)) {
      return;
    }

    const documents: Document[] = validated.map(({ file, type }) => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      uploadDate: new Date().toISOString(),
      caseId: data.caseId,
      caseName: mockCases.find((c) => c.id === data.caseId)?.title ?? "",
      type,
      description: data.description,
    }));

    console.log("UPLOAD", documents);

    await new Promise((r) => setTimeout(r, 800));

    reset();
    setItems([]);
    setFileError(null);
    onClose();
  };

  const handleCancel = () => {
    reset();
    setItems([]);
    setFileError(null);
    onClose();
  };

  /* ---------------- Render ---------------- */

  return (
    <DialogForm
      open={open}
      onClose={handleCancel}
      title="Upload Documents"
      subtitle="Upload documents and associate them with a case."
      submitLabel="Upload"
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      {/* Dropzone */}
      <Box
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClickDropzone}
        className={`
          rounded-lg border-2 border-dashed
          flex flex-col items-center justify-center
          px-4 text-center transition-all
          ${
            !canAddMore
              ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
              : isDragging
                ? "border-primary bg-primary/5 text-primary py-10"
                : "border-gray-300 hover:border-primary/60 cursor-pointer py-10"
          }
        `}
      >
        <CloudUploadOutlinedIcon className="text-3xl" />
        <Typography variant="body2" className="font-medium">
          {!canAddMore
            ? "Maximum file limit reached"
            : "Drag & drop files or click to browse"}
        </Typography>
        <Typography variant="caption">Up to {MAX_FILES} documents</Typography>

        <input
          ref={inputRef}
          type="file"
          multiple
          hidden
          onChange={handleFileInputChange}
        />
      </Box>

      {fileError && (
        <Typography className="text-sm text-red-600">{fileError}</Typography>
      )}

      {/* Files */}
      {items.length > 0 && (
        <Box className="flex flex-col gap-1">
          {items.map((item, index) => (
            <Box key={index} className="relative">
              <Box
                className={`
                  flex items-center gap-3 rounded-md border px-2 py-1
                  ${
                    item.hasError
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 bg-gray-50"
                  }
                `}
              >
                <Box className="flex-1 min-w-0">
                  <Typography className="text-sm truncate">
                    {item.file.name}
                  </Typography>
                  <Typography className="text-[11px] text-gray-500">
                    {(item.file.size / 1024 / 1024).toFixed(2)} MB
                  </Typography>
                </Box>

                <TextField
                  className="input-rounded-firm"
                  size="small"
                  select
                  value={item.type}
                  error={item.hasError}
                  onChange={(e) => handleTypeChange(index, e.target.value)}
                  sx={{
                    minWidth: 120,
                    "& .MuiInputBase-root": {
                      height: 32,
                      fontSize: 13,
                    },
                  }}
                >
                  {Object.keys(DocumentType).map((type) => (
                    <MenuItem key={type} value={type}>
                      {DocumentType[type as keyof typeof DocumentType]}
                    </MenuItem>
                  ))}
                </TextField>

                <IconButton
                  size="small"
                  onClick={() => handleRemoveItem(index)}
                >
                  <CloseOutlinedIcon fontSize="small" />
                </IconButton>
              </Box>

              {/* Error text – does NOT push layout */}
              {item.hasError && (
                <Typography className="-bottom-4 left-2 text-[11px] text-red-600">
                  Please select a document type.
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* Case */}
      <Controller
        name="caseId"
        control={control}
        rules={{ required: "Case is required" }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            className="input-rounded-firm"
            size="small"
            select
            label="Associate with Case"
            fullWidth
            required
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          >
            {mockCases.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.title}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      {/* Description */}
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="input-rounded-firm"
            size="small"
            label="Notes (optional)"
            multiline
            rows={2}
            fullWidth
          />
        )}
      />
    </DialogForm>
  );
}
