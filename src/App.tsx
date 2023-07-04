import React, { useState } from "react";
import { AppBar, AppWrapper, Flexbox, Main } from "./style";
import FireCalculator from "./components/fire-calculator";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Sidebar } from "./components/Sidebar";
import MenuIcon from "@mui/icons-material/Menu";

function App() {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Flexbox>
        <Sidebar open={open} handleDrawerToggle={handleDrawerToggle}/>
        <Main open={open}>
          <Box sx={{ maxWidth: 275 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Savings
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ maxWidth: 275 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Expenses
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Main>
      </Flexbox>
    </>
  );
}

export default App;
