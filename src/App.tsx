import React, { useMemo, useState } from "react";
import { Flexbox, Main } from "./style";
import FireCalculator from "./components/fire/fire-calculator";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Sidebar } from "./components/sidebar/Sidebar";
import { DrawerChoicesEnum } from "./styles/constants";

function App() {
  const [open, setOpen] = useState(false);
  const [main, setMain] = useState(DrawerChoicesEnum.FIRE);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleDrawerChoice = (drawerChoice: DrawerChoicesEnum) => {
    setMain(drawerChoice);
  };

  const renderMain = useMemo(() => {
    switch (main) {
      case DrawerChoicesEnum.FIRE:
        return <FireCalculator />;
    }
  }, [main]);

  return (
    <>
      <Flexbox>
        <Sidebar
          open={open}
          handleDrawerToggle={handleDrawerToggle}
          handleDrawerChoice={handleDrawerChoice}
        />
        <Main open={open}>
          {renderMain}
        </Main>
      </Flexbox>
    </>
  );
}

export default App;
