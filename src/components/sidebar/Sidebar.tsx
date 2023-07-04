import { AutoGraph } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Drawer, DrawerHeader, ItemHover } from "./style";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { DrawerChoicesEnum } from "../../styles/constants";

export const Sidebar = ({
  open,
  handleDrawerToggle,
  handleDrawerChoice,
}: {
  open: boolean;
  handleDrawerToggle: () => void;
  handleDrawerChoice: (drawerChoice: DrawerChoicesEnum) => void;
}) => {
  return (
    <Drawer variant="permanent" anchor="left" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerToggle}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </DrawerHeader>
      <Divider />

      <List>
        <ItemHover onClick={() => handleDrawerChoice(DrawerChoicesEnum.FIRE)}>
          <ListItemIcon>
            <AutoGraph />
          </ListItemIcon>
          <ListItemText primary="F.I.R.E" />
        </ItemHover>
        <ItemHover onClick={() => handleDrawerChoice(DrawerChoicesEnum.THEME)}>
          <ListItemIcon>
            <AutoGraph />
          </ListItemIcon>
          <ListItemText primary="Theme" />
        </ItemHover>
        <ItemHover onClick={() => handleDrawerChoice(DrawerChoicesEnum.CONTACT)}>
          <ListItemIcon>
            <AutoGraph />
          </ListItemIcon>
          <ListItemText primary="Contact" />
        </ItemHover>
      </List>
    </Drawer>
  );
};
