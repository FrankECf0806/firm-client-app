import { TextField, InputAdornment, IconButton } from "@mui/material";
import { CloseOutlined as CloseOutlinedIcon } from "@mui/icons-material";
import { ClearableSelectProps } from "@/types/ui";

export function ClearableSelect({
  value,
  onChange,
  clearable = false,
  required = false,
  disabled = false,
  clearValue = "",
  ...props
}: ClearableSelectProps) {
  const showClear = clearable && !required && !disabled && Boolean(value);

  const handleClearClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onChange(clearValue);
  };

  return (
    <TextField
      {...props}
      select
      value={value}
      required={required}
      disabled={disabled}
      slotProps={{
        input: {
          endAdornment: showClear ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                className="select-clear-btn"
                onClick={handleClearClick}
              >
                <CloseOutlinedIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null,
        },
      }}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
