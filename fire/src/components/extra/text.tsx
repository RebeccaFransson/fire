import { Typography } from "@mui/material";

export const getTitle = (value: string) => (
  <Typography
    variant="overline"
    sx={{ fontSize: 14 }}
    color="text.secondary"
    gutterBottom
  >
    {value}
  </Typography>
);
export const getText = (value: string) => (
  <Typography
    sx={{ fontSize: 14 }}
    color="text.secondary"
    gutterBottom
  >
    {value}
  </Typography>
);
