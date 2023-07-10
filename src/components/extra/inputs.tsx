import { InputAdornment, TextField } from "@mui/material";

export const getAgeTextField = (
  label: string,
  value: number,
  onChange: (value: number) => void
) => (
  <TextField
    sx={{ width: "100px" }}
    id="standard-basic"
    label={label}
    variant="standard"
    defaultValue={value}
    onChange={(e) => onChange(parseInt(e.target.value))}
    InputProps={{
      endAdornment: <InputAdornment position="end">years</InputAdornment>,
    }}
  />
);
