import { InputAdornment } from "@mui/material";
import { StyledTextField } from "./style";

export const getAgeTextField = (
  label: string,
  value: number,
  onChange: (value: number) => void
) => (
  <StyledTextField
    sx={{ width: "100px" }}
    label={label}
    variant="standard"
    defaultValue={value}
    onChange={(e) => onChange(parseInt(e.target.value))}
    InputProps={{
      endAdornment: <InputAdornment position="end">years</InputAdornment>,
    }}
  />
);
export const getDollarTextField = (
  label: string,
  value: number,
  onChange: (value: number) => void
) => (
  <StyledTextField
    sx={{ width: "100px" }}
    label={label}
    variant="standard"
    defaultValue={value}
    onChange={(e) => onChange(parseInt(e.target.value))}
    InputProps={{
      startAdornment: <InputAdornment position="start">$</InputAdornment>,
    }}
  />
);
