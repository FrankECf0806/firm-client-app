import { TextField, InputAdornment, IconButton } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { ClearableSelectProps } from "@/types/ui";

export function ClearableSelect({
  value,
  onChange,
  clearable = false,
  required = false,
  disabled = false,
  ...props
}: ClearableSelectProps) {
  const showClear = clearable && !required && !disabled && Boolean(value);

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
                onClick={(e) => {
                  e.stopPropagation();
                  onChange("");
                }}
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
